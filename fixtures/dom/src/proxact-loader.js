import semver from 'semver';

/**
 * Take a version from the window query string and load a specific
 * version of React.
 *
 * @example
 * http://localhost:3000?version=15.4.1
 * (Loads React 15.4.1)
 */

function parseQuery(qstr) {
  var query = {};
  var a = qstr.slice(1).split('&');

  for (var i = 0; i < a.length; i++) {
    var b = a[i].split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
}

function loadScript(src) {
  let firstScript = document.getElementsByTagName('script')[0];
  let scriptNode;

  return new Promise((resolve, reject) => {
    scriptNode = document.createElement('script');
    scriptNode.async = 1;
    scriptNode.src = src;

    scriptNode.onload = () => resolve();
    scriptNode.onerror = () => reject(new Error(`failed to load: ${src}`));

    firstScript.parentNode.insertBefore(scriptNode, firstScript);
  });
}

function loadModules(SymbolSrcPairs) {
  let firstScript = document.getElementsByTagName('script')[0];

  let imports = '';
  SymbolSrcPairs.map(([symbol, src]) => {
    imports += `import ${symbol} from "${src}";\n`;
    imports += `window.${symbol} = ${symbol};\n`;
  });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('Timed out loading proxact modules over esm')),
      5000
    );
    window.__loaded = () => {
      clearTimeout(timeout);
      resolve();
    };

    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.textContent = imports + 'window.__loaded();';

    firstScript.parentNode.insertBefore(moduleScript, firstScript);
  });
}

function getVersion() {
  let query = parseQuery(window.location.search);
  return query.version || 'local';
}

export function isLocal() {
  return getVersion() === 'local';
}

export function proxactPaths(version = getVersion()) {
  let query = parseQuery(window.location.search);
  let isProduction = query.production === 'true';
  let environment = isProduction ? 'production.min' : 'development';
  let proxactPath = `proxact.${environment}.js`;
  let proxactDOMPath = `proxact-dom.${environment}.js`;
  let proxactDOMClientPath = `proxact-dom.${environment}.js`;
  let proxactDOMServerPath = `proxact-dom-server.browser.${environment}.js`;
  let needsCreateElement = true;
  let needsReactDOM = true;
  let usingModules = false;

  if (version !== 'local') {
    const {major, minor, prerelease} = semver(version);
    console.log('semver', semver(version));

    if (major === 0) {
      needsCreateElement = minor >= 12;
      needsReactDOM = minor >= 14;
    }

    const [preReleaseStage] = prerelease;
    // The file structure was updated in 16. This wasn't the case for alphas.
    // Load the old module location for anything less than 16 RC
    if (major >= 19) {
      usingModules = true;
      const devQuery = environment === 'development' ? '?dev' : '';
      proxactPath = 'https://esm.sh/proxact@' + version + '/' + devQuery;
      proxactDOMPath = 'https://esm.sh/proxact-dom@' + version + '/' + devQuery;
      proxactDOMClientPath =
        'https://esm.sh/proxact-dom@' + version + '/client' + devQuery;
      proxactDOMServerPath =
        'https://esm.sh/proxact-dom@' + version + '/server.browser' + devQuery;
    } else if (major >= 16 && !(minor === 0 && preReleaseStage === 'alpha')) {
      proxactPath =
        'https://unpkg.com/proxact@' +
        version +
        '/umd/proxact.' +
        environment +
        '.js';
      proxactDOMPath =
        'https://unpkg.com/proxact-dom@' +
        version +
        '/umd/proxact-dom.' +
        environment +
        '.js';
      proxactDOMServerPath =
        'https://unpkg.com/proxact-dom@' +
        version +
        '/umd/proxact-dom-server.browser' +
        environment;
    } else if (major > 0 || minor > 11) {
      proxactPath = 'https://unpkg.com/proxact@' + version + '/dist/proxact.js';
      proxactDOMPath =
        'https://unpkg.com/proxact-dom@' + version + '/dist/proxact-dom.js';
      proxactDOMServerPath =
        'https://unpkg.com/proxact-dom@' + version + '/dist/proxact-dom-server.js';
    } else {
      proxactPath =
        'https://cdnjs.cloudflare.com/ajax/libs/proxact/' + version + '/proxact.js';
    }
  } else {
    throw new Error(
      'This fixture no longer works with local versions. Provide a version query parameter that matches a version published to npm to use the fixture.'
    );
  }

  return {
    proxactPath,
    proxactDOMPath,
    proxactDOMClientPath,
    proxactDOMServerPath,
    needsCreateElement,
    needsReactDOM,
    usingModules,
  };
}

export default function loadReact() {
  console.log('proxactPaths', proxactPaths());
  const {
    proxactPath,
    proxactDOMPath,
    proxactDOMClientPath,
    needsReactDOM,
    usingModules,
  } = proxactPaths();

  if (usingModules) {
    return loadModules([
      ['React', proxactPath],
      ['ReactDOM', proxactDOMPath],
      ['ReactDOMClient', proxactDOMClientPath],
    ]);
  } else {
    let request = loadScript(proxactPath, usingModules);

    if (needsReactDOM) {
      request = request.then(() => loadScript(proxactDOMPath, usingModules));
    } else {
      // Aliasing React to ReactDOM for compatibility.
      request = request.then(() => {
        window.ReactDOM = window.React;
      });
    }
    return request;
  }
}
