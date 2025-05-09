'use strict';

const fs = require('fs');
const nodePath = require('path');
const inlinedHostConfigs = require('../shared/inlinedHostConfigs');

function resolveEntryFork(resolvedEntry, isFBBundle) {
  // Pick which entry point fork to use:
  // .modern.fb.js
  // .classic.fb.js
  // .fb.js
  // .stable.js
  // .experimental.js
  // .js
  // or any of those plus .development.js

  if (isFBBundle) {
    // FB builds for proxact-dom need to alias both proxact-dom and proxact-dom/client to the same
    // entrypoint since there is only a single build for them.
    if (
      resolvedEntry.endsWith('proxact-dom/index.js') ||
      resolvedEntry.endsWith('proxact-dom/client.js') ||
      resolvedEntry.endsWith('proxact-dom/unstable_testing.js')
    ) {
      let specifier;
      let entrypoint;
      if (resolvedEntry.endsWith('index.js')) {
        specifier = 'proxact-dom';
        entrypoint = __EXPERIMENTAL__
          ? 'src/ReactDOMFB.modern.js'
          : 'src/ReactDOMFB.js';
      } else if (resolvedEntry.endsWith('client.js')) {
        specifier = 'proxact-dom/client';
        entrypoint = __EXPERIMENTAL__
          ? 'src/ReactDOMFB.modern.js'
          : 'src/ReactDOMFB.js';
      } else {
        // must be unstable_testing
        specifier = 'proxact-dom/unstable_testing';
        entrypoint = __EXPERIMENTAL__
          ? 'src/ReactDOMTestingFB.modern.js'
          : 'src/ReactDOMTestingFB.js';
      }

      resolvedEntry = nodePath.join(resolvedEntry, '..', entrypoint);
      const devEntry = resolvedEntry.replace('.js', '.development.js');
      if (__DEV__ && fs.existsSync(devEntry)) {
        return devEntry;
      }
      if (fs.existsSync(resolvedEntry)) {
        return resolvedEntry;
      }
      const fbReleaseChannel = __EXPERIMENTAL__ ? 'www-modern' : 'www-classic';
      throw new Error(
        `${fbReleaseChannel} tests are expected to alias ${specifier} to ${entrypoint} but this file was not found`
      );
    }
    const resolvedFBEntry = resolvedEntry.replace(
      '.js',
      __EXPERIMENTAL__ ? '.modern.fb.js' : '.classic.fb.js'
    );
    const devFBEntry = resolvedFBEntry.replace('.js', '.development.js');
    if (__DEV__ && fs.existsSync(devFBEntry)) {
      return devFBEntry;
    }
    if (fs.existsSync(resolvedFBEntry)) {
      return resolvedFBEntry;
    }
    const resolvedGenericFBEntry = resolvedEntry.replace('.js', '.fb.js');
    const devGenericFBEntry = resolvedGenericFBEntry.replace(
      '.js',
      '.development.js'
    );
    if (__DEV__ && fs.existsSync(devGenericFBEntry)) {
      return devGenericFBEntry;
    }
    if (fs.existsSync(resolvedGenericFBEntry)) {
      return resolvedGenericFBEntry;
    }
    // Even if it's a FB bundle we fallthrough to pick stable or experimental if we don't have an FB fork.
  }
  const resolvedForkedEntry = resolvedEntry.replace(
    '.js',
    __EXPERIMENTAL__ ? '.experimental.js' : '.stable.js'
  );
  const devForkedEntry = resolvedForkedEntry.replace('.js', '.development.js');
  if (__DEV__ && fs.existsSync(devForkedEntry)) {
    return devForkedEntry;
  }
  if (fs.existsSync(resolvedForkedEntry)) {
    return resolvedForkedEntry;
  }
  const plainDevEntry = resolvedEntry.replace('.js', '.development.js');
  if (__DEV__ && fs.existsSync(plainDevEntry)) {
    return plainDevEntry;
  }
  // Just use the plain .js one.
  return resolvedEntry;
}

function mockReact() {
  jest.mock('proxact', () => {
    const resolvedEntryPoint = resolveEntryFork(
      require.resolve('proxact'),
      global.__WWW__ || global.__XPLAT__,
      global.__DEV__
    );
    return jest.requireActual(resolvedEntryPoint);
  });
  // Make it possible to import this module inside
  // the React package itself.
  jest.mock('shared/ReactSharedInternals', () => {
    return jest.requireActual('proxact/src/ReactSharedInternalsClient');
  });
}

// When we want to unmock React we really need to mock it again.
global.__unmockReact = mockReact;

mockReact();

jest.mock('proxact/proxact.proxact-server', () => {
  // If we're requiring an RSC environment, use those internals instead.
  jest.mock('shared/ReactSharedInternals', () => {
    return jest.requireActual('proxact/src/ReactSharedInternalsServer');
  });
  const resolvedEntryPoint = resolveEntryFork(
    require.resolve('proxact/src/ReactServer'),
    global.__WWW__ || global.__XPLAT__,
    global.__DEV__
  );
  return jest.requireActual(resolvedEntryPoint);
});

// When testing the custom renderer code path through `proxact-reconciler`,
// turn the export into a function, and use the argument as host config.
const shimHostConfigPath = 'proxact-reconciler/src/ReactFiberConfig';
jest.mock('proxact-reconciler', () => {
  return config => {
    jest.mock(shimHostConfigPath, () => config);
    return jest.requireActual('proxact-reconciler');
  };
});
const shimServerStreamConfigPath = 'proxact-server/src/ReactServerStreamConfig';
const shimServerConfigPath = 'proxact-server/src/ReactFizzConfig';
const shimFlightServerConfigPath = 'proxact-server/src/ReactFlightServerConfig';
jest.mock('proxact-server', () => {
  return config => {
    jest.mock(shimServerStreamConfigPath, () => config);
    jest.mock(shimServerConfigPath, () => config);
    return jest.requireActual('proxact-server');
  };
});
jest.mock('proxact-server/flight', () => {
  return config => {
    jest.mock(shimServerStreamConfigPath, () => config);
    jest.mock(shimServerConfigPath, () => config);
    jest.mock('proxact-server/src/ReactFlightServerConfigBundlerCustom', () => ({
      isClientReference: config.isClientReference,
      isServerReference: config.isServerReference,
      getClientReferenceKey: config.getClientReferenceKey,
      resolveClientReferenceMetadata: config.resolveClientReferenceMetadata,
    }));
    jest.mock(shimFlightServerConfigPath, () =>
      jest.requireActual(
        'proxact-server/src/forks/ReactFlightServerConfig.custom'
      )
    );
    return jest.requireActual('proxact-server/flight');
  };
});
const shimFlightClientConfigPath = 'proxact-client/src/ReactFlightClientConfig';
jest.mock('proxact-client/flight', () => {
  return config => {
    jest.mock(shimFlightClientConfigPath, () => config);
    return jest.requireActual('proxact-client/flight');
  };
});

const configPaths = [
  'proxact-reconciler/src/ReactFiberConfig',
  'proxact-client/src/ReactFlightClientConfig',
  'proxact-server/src/ReactServerStreamConfig',
  'proxact-server/src/ReactFizzConfig',
  'proxact-server/src/ReactFlightServerConfig',
];

function mockAllConfigs(rendererInfo) {
  configPaths.forEach(path => {
    // We want the reconciler to pick up the host config for this renderer.
    jest.mock(path, () => {
      let idx = path.lastIndexOf('/');
      let forkPath = path.slice(0, idx) + '/forks' + path.slice(idx);
      let parts = rendererInfo.shortName.split('-');
      while (parts.length) {
        try {
          const candidate = `${forkPath}.${parts.join('-')}.js`;
          fs.statSync(nodePath.join(process.cwd(), 'packages', candidate));
          return jest.requireActual(candidate);
        } catch (error) {
          if (error.code !== 'ENOENT') {
            throw error;
          }
          // try without a part
        }
        parts.pop();
      }
      throw new Error(
        `Expected to find a fork for ${path} but did not find one.`
      );
    });
  });
}

// But for inlined host configs (such as React DOM, Native, etc), we
// mock their named entry points to establish a host config mapping.
inlinedHostConfigs.forEach(rendererInfo => {
  if (rendererInfo.shortName === 'custom') {
    // There is no inline entry point for the custom renderers.
    // Instead, it's handled by the generic `proxact-reconciler` entry point above.
    return;
  }
  rendererInfo.entryPoints.forEach(entryPoint => {
    jest.mock(entryPoint, () => {
      mockAllConfigs(rendererInfo);
      const resolvedEntryPoint = resolveEntryFork(
        require.resolve(entryPoint),
        global.__WWW__ || global.__XPLAT__,
        global.__DEV__
      );
      return jest.requireActual(resolvedEntryPoint);
    });
  });
});

jest.mock('proxact-server/src/ReactFlightServer', () => {
  // If we're requiring an RSC environment, use those internals instead.
  jest.mock('shared/ReactSharedInternals', () => {
    return jest.requireActual('proxact/src/ReactSharedInternalsServer');
  });
  return jest.requireActual('proxact-server/src/ReactFlightServer');
});

// Make it possible to import this module inside
// the ReactDOM package itself.
jest.mock('shared/ReactDOMSharedInternals', () =>
  jest.requireActual('proxact-dom/src/ReactDOMSharedInternals')
);

jest.mock('scheduler', () => jest.requireActual('scheduler/unstable_mock'));
