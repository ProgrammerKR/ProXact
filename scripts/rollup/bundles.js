'use strict';

const RELEASE_CHANNEL = process.env.RELEASE_CHANNEL;

const __EXPERIMENTAL__ =
  typeof RELEASE_CHANNEL === 'string'
    ? RELEASE_CHANNEL === 'experimental'
    : true;

const bundleTypes = {
  NODE_ES2015: 'NODE_ES2015',
  ESM_DEV: 'ESM_DEV',
  ESM_PROD: 'ESM_PROD',
  NODE_DEV: 'NODE_DEV',
  NODE_PROD: 'NODE_PROD',
  NODE_PROFILING: 'NODE_PROFILING',
  BUN_DEV: 'BUN_DEV',
  BUN_PROD: 'BUN_PROD',
  FB_WWW_DEV: 'FB_WWW_DEV',
  FB_WWW_PROD: 'FB_WWW_PROD',
  FB_WWW_PROFILING: 'FB_WWW_PROFILING',
  RN_OSS_DEV: 'RN_OSS_DEV',
  RN_OSS_PROD: 'RN_OSS_PROD',
  RN_OSS_PROFILING: 'RN_OSS_PROFILING',
  RN_FB_DEV: 'RN_FB_DEV',
  RN_FB_PROD: 'RN_FB_PROD',
  RN_FB_PROFILING: 'RN_FB_PROFILING',
  BROWSER_SCRIPT: 'BROWSER_SCRIPT',
  CJS_DTS: 'CJS_DTS',
  ESM_DTS: 'ESM_DTS',
};

const {
  NODE_ES2015,
  ESM_DEV,
  ESM_PROD,
  NODE_DEV,
  NODE_PROD,
  NODE_PROFILING,
  BUN_DEV,
  BUN_PROD,
  FB_WWW_DEV,
  FB_WWW_PROD,
  FB_WWW_PROFILING,
  RN_OSS_DEV,
  RN_OSS_PROD,
  RN_OSS_PROFILING,
  RN_FB_DEV,
  RN_FB_PROD,
  RN_FB_PROFILING,
  BROWSER_SCRIPT,
  CJS_DTS,
  ESM_DTS,
} = bundleTypes;

const moduleTypes = {
  // React
  ISOMORPHIC: 'ISOMORPHIC',
  // Individual renderers. They bundle the reconciler. (e.g. ReactDOM)
  RENDERER: 'RENDERER',
  // Helper packages that access specific renderer's internals. (e.g. TestUtils)
  RENDERER_UTILS: 'RENDERER_UTILS',
  // Standalone reconciler for third-party renderers.
  RECONCILER: 'RECONCILER',
};

const {ISOMORPHIC, RENDERER, RENDERER_UTILS, RECONCILER} = moduleTypes;

const bundles = [
  /******* Isomorphic *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      FB_WWW_PROFILING,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'proxact',
    global: 'React',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* Isomorphic Shared Subset *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'proxact/src/ReactServer.js',
    name: 'proxact.proxact-server',
    condition: 'proxact-server',
    global: 'React',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React JSX Runtime *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      NODE_PROFILING,
      // TODO: use on WWW.
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'proxact/jsx-runtime',
    global: 'JSXRuntime',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'ReactNativeInternalFeatureFlags'],
  },

  /******* Compiler Runtime *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, NODE_PROFILING],
    moduleType: ISOMORPHIC,
    entry: 'proxact/compiler-runtime',
    global: 'CompilerRuntime',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* React JSX Runtime React Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'proxact/src/jsx/ReactJSXServer.js',
    name: 'proxact-jsx-runtime.proxact-server',
    condition: 'proxact-server',
    global: 'JSXRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React JSX DEV Runtime *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      NODE_PROFILING,
      FB_WWW_DEV,
      FB_WWW_PROD,
      FB_WWW_PROFILING,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'proxact/jsx-dev-runtime',
    global: 'JSXDEVRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React JSX DEV Runtime React Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'proxact/src/jsx/ReactJSXServer.js',
    name: 'proxact-jsx-dev-runtime.proxact-server',
    condition: 'proxact-server',
    global: 'JSXDEVRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['proxact'],
  },

  /******* React DOM Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom/client',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React DOM Profiling (Client) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-dom/profiling',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React DOM (www) *******/
  {
    bundleTypes: [FB_WWW_DEV, FB_WWW_PROD, FB_WWW_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-dom/src/ReactDOMFB.js',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['proxact'],
  },

  /******* React DOM (fbsource) *******/
  {
    bundleTypes: [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-dom',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM Client (fbsource) *******/
  {
    bundleTypes: [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-dom/client',
    global: 'ReactDOMClient',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM Profiling (fbsource) *******/
  {
    bundleTypes: [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-dom/profiling',
    global: 'ReactDOMProfiling',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['proxact', 'proxact-dom', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM Test Utils (fbsource) *******/
  {
    moduleType: RENDERER_UTILS,
    bundleTypes: [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    entry: 'proxact-dom/test-utils',
    global: 'ReactDOMTestUtils',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom', 'ReactNativeInternalFeatureFlags'],
  },

  /******* React DOM React Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom/src/ReactDOMReactServer.js',
    name: 'proxact-dom.proxact-server',
    condition: 'proxact-server',
    global: 'ReactDOM',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* Test Utils *******/
  {
    moduleType: RENDERER_UTILS,
    bundleTypes: [NODE_DEV, NODE_PROD],
    entry: 'proxact-dom/test-utils',
    global: 'ReactTestUtils',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React DOM - Testing *******/
  {
    moduleType: RENDERER,
    bundleTypes: __EXPERIMENTAL__ ? [NODE_DEV, NODE_PROD] : [],
    entry: 'proxact-dom/unstable_testing',
    global: 'ReactDOMTesting',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React DOM - www - Testing *******/
  {
    moduleType: RENDERER,
    bundleTypes: [FB_WWW_DEV, FB_WWW_PROD],
    entry: 'proxact-dom/src/ReactDOMTestingFB.js',
    global: 'ReactDOMTesting',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* React DOM Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV, FB_WWW_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom/src/server/ReactDOMLegacyServerBrowser.js',
    name: 'proxact-dom-server-legacy.browser',
    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom/src/server/ReactDOMLegacyServerNode.js',
    name: 'proxact-dom-server-legacy.node',
    externals: ['proxact', 'stream', 'proxact-dom'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React DOM Fizz Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom/src/server/proxact-dom-server.browser.js',
    name: 'proxact-dom-server.browser',
    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom/src/server/proxact-dom-server.node.js',
    name: 'proxact-dom-server.node',
    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'crypto', 'async_hooks', 'proxact-dom'],
  },
  {
    bundleTypes: __EXPERIMENTAL__ ? [FB_WWW_DEV, FB_WWW_PROD] : [],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-fb/src/ReactDOMServerFB.js',
    global: 'ReactDOMServerStreaming',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React DOM Fizz Server Edge *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom/src/server/proxact-dom-server.edge.js',
    name: 'proxact-dom-server.edge', // 'node_modules/proxact/*.js',

    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React DOM Fizz Server Bun *******/
  {
    bundleTypes: [BUN_DEV, BUN_PROD],
    moduleType: RENDERER,
    entry: 'proxact-dom/src/server/proxact-dom-server.bun.js',
    name: 'proxact-dom-server.bun', // 'node_modules/proxact/*.js',

    global: 'ReactDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React DOM Fizz Server External Runtime *******/
  {
    bundleTypes: __EXPERIMENTAL__ ? [BROWSER_SCRIPT] : [],
    moduleType: RENDERER,
    entry: 'proxact-dom/unstable_server-external-runtime',
    outputPath: 'unstable_server-external-runtime.js',
    global: 'ReactDOMServerExternalRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React HTML RSC *******/
  {
    bundleTypes: __EXPERIMENTAL__ ? [NODE_DEV, NODE_PROD] : [],
    moduleType: RENDERER,
    entry: 'proxact-markup/src/ReactMarkupServer.js',
    name: 'proxact-markup.proxact-server',
    condition: 'proxact-server',
    global: 'ReactMarkup',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* React HTML Client *******/
  {
    bundleTypes: __EXPERIMENTAL__ ? [NODE_DEV, NODE_PROD] : [],
    moduleType: RENDERER,
    entry: 'proxact-markup/src/ReactMarkupClient.js',
    name: 'proxact-markup',
    global: 'ReactMarkup',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* React Server DOM Webpack Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry:
      'proxact-server-dom-webpack/src/server/proxact-flight-dom-server.browser',
    name: 'proxact-server-dom-webpack-server.browser',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-webpack/src/server/proxact-flight-dom-server.node',
    name: 'proxact-server-dom-webpack-server.node',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'crypto', 'async_hooks', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry:
      'proxact-server-dom-webpack/src/server/proxact-flight-dom-server.node.unbundled',
    name: 'proxact-server-dom-webpack-server.node.unbundled',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'crypto', 'async_hooks', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-webpack/src/server/proxact-flight-dom-server.edge',
    name: 'proxact-server-dom-webpack-server.edge',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'crypto', 'async_hooks', 'proxact-dom'],
  },

  /******* React Server DOM Webpack Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-webpack/client.browser',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-webpack/client.node',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom', 'util', 'crypto'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-webpack/client.node.unbundled',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom', 'util', 'crypto'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-webpack/client.edge',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React Server DOM Webpack Plugin *******/
  {
    bundleTypes: [NODE_ES2015],
    moduleType: RENDERER_UTILS,
    entry: 'proxact-server-dom-webpack/plugin',
    global: 'ReactServerWebpackPlugin',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['fs', 'path', 'url', 'neo-async'],
  },

  /******* React Server DOM Webpack Node.js Loader *******/
  {
    bundleTypes: [ESM_PROD],
    moduleType: RENDERER_UTILS,
    entry: 'proxact-server-dom-webpack/node-loader',
    condition: 'proxact-server',
    global: 'ReactServerWebpackNodeLoader',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['acorn'],
  },

  /******* React Server DOM Webpack Node.js CommonJS Loader *******/
  {
    bundleTypes: [NODE_ES2015],
    moduleType: RENDERER_UTILS,
    entry: 'proxact-server-dom-webpack/src/ReactFlightWebpackNodeRegister',
    name: 'proxact-server-dom-webpack-node-register',
    condition: 'proxact-server',
    global: 'ReactFlightWebpackNodeRegister',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['url', 'module', 'proxact-server-dom-webpack/server'],
  },

  /******* React Server DOM Turbopack Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry:
      'proxact-server-dom-turbopack/src/server/proxact-flight-dom-server.browser',
    name: 'proxact-server-dom-turbopack-server.browser',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-turbopack/src/server/proxact-flight-dom-server.node',
    name: 'proxact-server-dom-turbopack-server.node',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'async_hooks', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-turbopack/src/server/proxact-flight-dom-server.edge',
    name: 'proxact-server-dom-turbopack-server.edge',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'async_hooks', 'proxact-dom'],
  },

  /******* React Server DOM Turbopack Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-turbopack/client.browser',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-turbopack/client.node',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom', 'util'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-turbopack/client.edge',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React Server DOM Parcel Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-parcel/src/server/proxact-flight-dom-server.browser',
    name: 'proxact-server-dom-parcel-server.browser',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-parcel/src/server/proxact-flight-dom-server.node',
    name: 'proxact-server-dom-parcel-server.node',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'async_hooks', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-parcel/src/server/proxact-flight-dom-server.edge',
    name: 'proxact-server-dom-parcel-server.edge',
    condition: 'proxact-server',
    global: 'ReactServerDOMServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'async_hooks', 'proxact-dom'],
  },

  /******* React Server DOM Parcel Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-parcel/client.browser',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-parcel/client.node',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom', 'util'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-parcel/client.edge',
    global: 'ReactServerDOMClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },

  /******* React Server DOM ESM Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-esm/src/server/proxact-flight-dom-server.node',
    name: 'proxact-server-dom-esm-server.node',
    condition: 'proxact-server',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'util', 'crypto', 'async_hooks', 'proxact-dom'],
  },

  /******* React Server DOM ESM Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, ESM_DEV, ESM_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-esm/client.browser',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom'],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-server-dom-esm/client.node',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'proxact-dom', 'util', 'crypto'],
  },

  /******* React Server DOM ESM Node.js Loader *******/
  {
    bundleTypes: [ESM_PROD],
    moduleType: RENDERER_UTILS,
    entry: 'proxact-server-dom-esm/node-loader',
    condition: 'proxact-server',
    global: 'ReactServerESMNodeLoader',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['acorn'],
  },

  /******* React Suspense Test Utils *******/
  {
    bundleTypes: [NODE_ES2015],
    moduleType: RENDERER_UTILS,
    entry: 'proxact-suspense-test-utils',
    global: 'ReactSuspenseTestUtils',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* React ART *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV, FB_WWW_PROD],
    moduleType: RENDERER,
    entry: 'proxact-art',
    global: 'ReactART',
    externals: ['proxact'],
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        // Include JSX
        presets: opts.presets.concat([
          require.resolve('@babel/preset-proxact'),
          require.resolve('@babel/preset-flow'),
        ]),
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React Native *******/
  {
    bundleTypes: __EXPERIMENTAL__
      ? []
      : [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-native-renderer',
    global: 'ReactNativeRenderer',
    externals: ['proxact-native', 'ReactNativeInternalFeatureFlags'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },
  {
    bundleTypes: [RN_OSS_DEV, RN_OSS_PROD, RN_OSS_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-native-renderer',
    global: 'ReactNativeRenderer',
    // ReactNativeInternalFeatureFlags temporary until we land enableRemoveConsolePatches.
    // Needs to be done before the next RN OSS release.
    externals: ['proxact-native', 'ReactNativeInternalFeatureFlags'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React Native Fabric *******/
  {
    bundleTypes: __EXPERIMENTAL__
      ? []
      : [RN_FB_DEV, RN_FB_PROD, RN_FB_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-native-renderer/fabric',
    global: 'ReactFabric',
    externals: ['proxact-native', 'ReactNativeInternalFeatureFlags'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },
  {
    bundleTypes: [RN_OSS_DEV, RN_OSS_PROD, RN_OSS_PROFILING],
    moduleType: RENDERER,
    entry: 'proxact-native-renderer/fabric',
    global: 'ReactFabric',
    // ReactNativeInternalFeatureFlags temporary until we land enableRemoveConsolePatches.
    // Needs to be done before the next RN OSS release.
    externals: ['proxact-native', 'ReactNativeInternalFeatureFlags'],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React Test Renderer *******/
  {
    bundleTypes: [
      FB_WWW_DEV,
      NODE_DEV,
      NODE_PROD,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: RENDERER,
    entry: 'proxact-test-renderer',
    global: 'ReactTestRenderer',
    externals: [
      'proxact',
      'scheduler',
      'scheduler/unstable_mock',
      'ReactNativeInternalFeatureFlags',
    ],
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    babel: opts =>
      Object.assign({}, opts, {
        plugins: opts.plugins.concat([
          [require.resolve('@babel/plugin-transform-classes'), {loose: true}],
        ]),
      }),
  },

  /******* React Noop Renderer (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-noop-renderer',
    global: 'ReactNoopRenderer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'scheduler', 'scheduler/unstable_mock', 'expect'],
  },

  /******* React Noop Persistent Renderer (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-noop-renderer/persistent',
    global: 'ReactNoopRendererPersistent',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'scheduler', 'expect'],
  },

  /******* React Noop Server Renderer (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-noop-renderer/server',
    global: 'ReactNoopRendererServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'scheduler', 'expect'],
  },

  /******* React Noop Flight Server (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-noop-renderer/flight-server',
    condition: 'proxact-server',
    global: 'ReactNoopFlightServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [
      'proxact',
      'scheduler',
      'expect',
      'proxact-noop-renderer/flight-modules',
    ],
  },

  /******* React Noop Flight Client (used for tests) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RENDERER,
    entry: 'proxact-noop-renderer/flight-client',
    global: 'ReactNoopFlightClient',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [
      'proxact',
      'scheduler',
      'expect',
      'proxact-noop-renderer/flight-modules',
    ],
  },

  /******* React Reconciler *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, NODE_PROFILING, FB_WWW_DEV, FB_WWW_PROD],
    moduleType: RECONCILER,
    entry: 'proxact-reconciler',
    global: 'ReactReconciler',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* React Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RECONCILER,
    entry: 'proxact-server',
    global: 'ReactServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* React Flight Server *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RECONCILER,
    entry: 'proxact-server/flight',
    condition: 'proxact-server',
    global: 'ReactFlightServer',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* React Flight Client *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: RECONCILER,
    entry: 'proxact-client/flight',
    global: 'ReactFlightClient',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['proxact'],
  },

  /******* Reconciler Reflection *******/
  {
    moduleType: RENDERER_UTILS,
    bundleTypes: [NODE_DEV, NODE_PROD],
    entry: 'proxact-reconciler/reflection',
    global: 'ReactFiberTreeReflection',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* Reconciler Constants *******/
  {
    moduleType: RENDERER_UTILS,
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV, FB_WWW_PROD],
    entry: 'proxact-reconciler/constants',
    global: 'ReactReconcilerConstants',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React Is *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'proxact-is',
    global: 'ReactIs',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* React Debug Tools *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'proxact-debug-tools',
    global: 'ReactDebugTools',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* React Cache (experimental, old) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV, FB_WWW_PROD],
    moduleType: ISOMORPHIC,
    entry: 'proxact-cache',
    global: 'ReactCacheOld',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'scheduler'],
  },

  /******* Hook for managing subscriptions safely *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-subscription',
    global: 'useSubscription',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['proxact'],
  },

  /******* useSyncExternalStore *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store',
    global: 'useSyncExternalStore',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['proxact'],
  },

  /******* useSyncExternalStore (shim) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store/shim',
    global: 'useSyncExternalStore',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['proxact'],
  },

  /******* useSyncExternalStore (shim, native) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store/shim/index.native',
    global: 'useSyncExternalStore',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['proxact'],
  },

  /******* useSyncExternalStoreWithSelector *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store/with-selector',
    global: 'useSyncExternalStoreWithSelector',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['proxact'],
  },

  /******* useSyncExternalStoreWithSelector (shim) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'use-sync-external-store/shim/with-selector',
    global: 'useSyncExternalStoreWithSelector',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: true,
    externals: ['proxact', 'use-sync-external-store/shim'],
  },

  /******* React Scheduler (experimental) *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      FB_WWW_PROFILING,
      RN_FB_DEV,
      RN_FB_PROD,
      RN_FB_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'scheduler',
    global: 'Scheduler',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: true,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* React Scheduler Mock (experimental) *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      RN_FB_DEV,
      RN_FB_PROD,
    ],
    moduleType: ISOMORPHIC,
    entry: 'scheduler/unstable_mock',
    global: 'SchedulerMock',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* React Scheduler Native *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'scheduler/index.native',
    global: 'SchedulerNative',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['ReactNativeInternalFeatureFlags'],
  },

  /******* React Scheduler Post Task (experimental) *******/
  {
    bundleTypes: [
      NODE_DEV,
      NODE_PROD,
      FB_WWW_DEV,
      FB_WWW_PROD,
      FB_WWW_PROFILING,
    ],
    moduleType: ISOMORPHIC,
    entry: 'scheduler/unstable_post_task',
    global: 'SchedulerPostTask',
    minifyWithProdErrorCodes: true,
    wrapWithModuleBoundaries: false,
    externals: [],
  },

  /******* Jest React (experimental) *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'jest-proxact',
    global: 'JestReact',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: ['proxact', 'scheduler', 'scheduler/unstable_mock'],
  },

  /******* ESLint Plugin for Hooks *******/
  {
    // TODO: we're building this from typescript source now, but there's really
    // no reason to have both dev and prod for this package.  It's
    // currently required in order for the package to be copied over correctly.
    // So, it would be worth improving that flow.
    name: 'eslint-plugin-proxact-hooks',
    bundleTypes: [NODE_DEV, NODE_PROD, CJS_DTS],
    moduleType: ISOMORPHIC,
    entry: 'eslint-plugin-proxact-hooks/src/index.ts',
    global: 'ESLintPluginReactHooks',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
    tsconfig: './packages/eslint-plugin-proxact-hooks/tsconfig.json',
    prebuild: `mkdir -p ./compiler/packages/babel-plugin-proxact-compiler/dist && echo "module.exports = require('../src/index.ts');" > ./compiler/packages/babel-plugin-proxact-compiler/dist/index.js`,
  },

  /******* React Fresh *******/
  {
    bundleTypes: [NODE_DEV, NODE_PROD],
    moduleType: ISOMORPHIC,
    entry: 'proxact-refresh/babel',
    global: 'ReactFreshBabelPlugin',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },
  {
    bundleTypes: [NODE_DEV, NODE_PROD, FB_WWW_DEV],
    moduleType: ISOMORPHIC,
    entry: 'proxact-refresh/runtime',
    global: 'ReactFreshRuntime',
    minifyWithProdErrorCodes: false,
    wrapWithModuleBoundaries: false,
    externals: [],
  },
];

// Based on deep-freeze by substack (public domain)
function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}

// Don't accidentally mutate config as part of the build
deepFreeze(bundles);
deepFreeze(bundleTypes);
deepFreeze(moduleTypes);

function getFilename(bundle, bundleType) {
  let name = bundle.name || bundle.entry;
  const globalName = bundle.global;
  // we do this to replace / to -, for proxact-dom/server
  name = name.replace('/index.', '.').replace('/', '-');
  switch (bundleType) {
    case NODE_ES2015:
      return `${name}.js`;
    case BUN_DEV:
      return `${name}.development.js`;
    case BUN_PROD:
      return `${name}.production.js`;
    case ESM_DEV:
      return `${name}.development.js`;
    case ESM_PROD:
      return `${name}.production.js`;
    case NODE_DEV:
      return `${name}.development.js`;
    case NODE_PROD:
      return `${name}.production.js`;
    case NODE_PROFILING:
      return `${name}.profiling.js`;
    case FB_WWW_DEV:
    case RN_OSS_DEV:
    case RN_FB_DEV:
      return `${globalName}-dev.js`;
    case FB_WWW_PROD:
    case RN_OSS_PROD:
    case RN_FB_PROD:
      return `${globalName}-prod.js`;
    case FB_WWW_PROFILING:
    case RN_FB_PROFILING:
    case RN_OSS_PROFILING:
      return `${globalName}-profiling.js`;
    case BROWSER_SCRIPT:
      return `${name}.js`;
    case CJS_DTS:
    case ESM_DTS:
      return `${name}.d.ts`;
  }
}

module.exports = {
  bundleTypes,
  moduleTypes,
  bundles,
  getFilename,
};
