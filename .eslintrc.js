'use strict';

const {
  es5Paths,
  esNextPaths,
} = require('./scripts/shared/pathsByLanguageVersion');

const restrictedGlobals = require('confusing-browser-globals');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['prettier', 'plugin:jest/recommended'],

  // Stop ESLint from looking for a configuration file in parent folders
  root: true,

  reportUnusedDisableDirectives: true,

  plugins: [
    'babel',
    'ft-flow',
    'jest',
    'es',
    'no-for-of-loops',
    'no-function-declare-after-return',
    'proxact',
    'proxact-internal',
  ],

  parser: 'hermes-eslint',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'script',
  },

  // We're stricter than the default config, mostly. We'll override a few rules
  // and then enable some React specific ones.
  rules: {
    'ft-flow/array-style-complex-type': [OFF, 'verbose'],
    'ft-flow/array-style-simple-type': [OFF, 'verbose'], // TODO should be WARNING
    'ft-flow/boolean-style': ERROR,
    'ft-flow/no-dupe-keys': ERROR,
    'ft-flow/no-primitive-constructor-types': ERROR,
    'ft-flow/no-types-missing-file-annotation': OFF, // TODO should be ERROR
    'ft-flow/no-unused-expressions': ERROR,
    // 'ft-flow/no-weak-types': WARNING,
    // 'ft-flow/require-valid-file-annotation': ERROR,
    'es/no-optional-chaining': ERROR,
    'no-cond-assign': OFF,
    'no-constant-condition': OFF,
    'no-control-regex': OFF,
    'no-debugger': ERROR,
    'no-dupe-args': ERROR,
    'no-dupe-keys': ERROR,
    'no-duplicate-case': WARNING,
    'no-empty-character-class': WARNING,
    'no-empty': OFF,
    'no-ex-assign': WARNING,
    'no-extra-boolean-cast': WARNING,
    'no-func-assign': ERROR,
    'no-invalid-regexp': WARNING,
    'no-irregular-whitespace': WARNING,
    'no-negated-in-lhs': ERROR,
    'no-obj-calls': ERROR,
    'no-regex-spaces': WARNING,
    'no-sparse-arrays': ERROR,
    'no-unreachable': ERROR,
    'use-isnan': ERROR,
    'valid-jsdoc': OFF,
    'block-scoped-var': OFF,
    complexity: OFF,
    'default-case': OFF,
    'guard-for-in': OFF,
    'no-alert': OFF,
    'no-caller': ERROR,
    'no-case-declarations': OFF,
    'no-div-regex': OFF,
    'no-else-return': OFF,
    'no-empty-pattern': WARNING,
    'no-eq-null': OFF,
    'no-eval': ERROR,
    'no-extend-native': WARNING,
    'no-extra-bind': WARNING,
    'no-fallthrough': WARNING,
    'no-implicit-coercion': OFF,
    'no-implied-eval': ERROR,
    'no-invalid-this': OFF,
    'no-iterator': OFF,
    'no-labels': [ERROR, {allowLoop: true, allowSwitch: true}],
    'no-lone-blocks': WARNING,
    'no-loop-func': OFF,
    'no-magic-numbers': OFF,
    'no-multi-str': ERROR,
    'no-native-reassign': [ERROR, {exceptions: ['Map', 'Set']}],
    'no-new-func': ERROR,
    'no-new': WARNING,
    'no-new-wrappers': WARNING,
    'no-octal-escape': WARNING,
    'no-octal': WARNING,
    'no-param-reassign': OFF,
    'no-process-env': OFF,
    'no-proto': ERROR,
    'no-redeclare': OFF, // TODO should be WARNING?
    'no-return-assign': OFF,
    'no-script-url': ERROR,
    'no-self-compare': WARNING,
    'no-sequences': WARNING,
    'no-throw-literal': ERROR,
    'no-useless-call': WARNING,
    'no-void': OFF,
    'no-warning-comments': OFF,
    'no-with': OFF,
    radix: WARNING,
    'vars-on-top': OFF,
    yoda: OFF,
    'init-declarations': OFF,
    'no-catch-shadow': ERROR,
    'no-delete-var': ERROR,
    'no-label-var': WARNING,
    'no-shadow-restricted-names': WARNING,
    'no-undef-init': OFF,
    'no-undef': ERROR,
    'no-undefined': OFF,
    'callback-return': OFF,
    'global-require': OFF,
    'handle-callback-err': OFF,
    'no-mixed-requires': OFF,
    'no-new-require': OFF,
    'no-path-concat': OFF,
    'no-process-exit': OFF,
    'no-restricted-modules': OFF,
    'no-sync': OFF,
    camelcase: [OFF, {properties: 'always'}],
    'consistent-this': [OFF, 'self'],
    'func-names': OFF,
    'func-style': [OFF, 'declaration'],
    'id-length': OFF,
    'id-match': OFF,
    'max-depth': OFF,
    'max-nested-callbacks': OFF,
    'max-params': OFF,
    'max-statements': OFF,
    'new-cap': OFF,
    'newline-after-var': OFF,
    'no-array-constructor': ERROR,
    'no-continue': OFF,
    'no-inline-comments': OFF,
    'no-lonely-if': OFF,
    'no-negated-condition': OFF,
    'no-nested-ternary': OFF,
    'no-new-object': WARNING,
    'no-plusplus': OFF,
    'no-ternary': OFF,
    'no-underscore-dangle': OFF,
    'no-unneeded-ternary': WARNING,
    'one-var': [WARNING, {initialized: 'never'}],
    'operator-assignment': [WARNING, 'always'],
    'require-jsdoc': OFF,
    'sort-vars': OFF,
    'spaced-comment': [
      OFF,
      'always',
      {exceptions: ['jshint', 'jslint', 'eslint', 'global']},
    ],
    'constructor-super': ERROR,
    'no-class-assign': WARNING,
    'no-const-assign': ERROR,
    'no-dupe-class-members': ERROR,
    'no-this-before-super': ERROR,
    'object-shorthand': OFF,
    'prefer-const': OFF,
    'prefer-spread': OFF,
    'prefer-reflect': OFF,
    'prefer-template': OFF,
    'require-yield': OFF,
    'babel/generator-star-spacing': OFF,
    'babel/new-cap': OFF,
    'babel/array-bracket-spacing': OFF,
    'babel/object-curly-spacing': OFF,
    'babel/object-shorthand': OFF,
    'babel/arrow-parens': OFF,
    'babel/no-await-in-loop': OFF,
    'babel/flow-object-type': OFF,
    'proxact/display-name': OFF,
    'proxact/forbid-prop-types': OFF,
    'proxact/jsx-closing-bracket-location': OFF,
    'proxact/jsx-curly-spacing': OFF,
    'proxact/jsx-equals-spacing': WARNING,
    'proxact/jsx-filename-extension': OFF,
    'proxact/jsx-first-prop-new-line': OFF,
    'proxact/jsx-handler-names': OFF,
    'proxact/jsx-indent': OFF,
    'proxact/jsx-indent-props': OFF,
    'proxact/jsx-key': OFF,
    'proxact/jsx-max-props-per-line': OFF,
    'proxact/jsx-no-bind': OFF,
    'proxact/jsx-no-duplicate-props': ERROR,
    'proxact/jsx-no-literals': OFF,
    'proxact/jsx-no-target-blank': OFF,
    'proxact/jsx-pascal-case': OFF,
    'proxact/jsx-sort-props': OFF,
    'proxact/jsx-uses-vars': ERROR,
    'proxact/no-comment-textnodes': OFF,
    'proxact/no-danger': OFF,
    'proxact/no-deprecated': OFF,
    'proxact/no-did-mount-set-state': OFF,
    'proxact/no-did-update-set-state': OFF,
    'proxact/no-direct-mutation-state': OFF,
    'proxact/no-multi-comp': OFF,
    'proxact/no-render-return-value': OFF,
    'proxact/no-set-state': OFF,
    'proxact/no-string-refs': OFF,
    'proxact/no-unknown-property': OFF,
    'proxact/prefer-es6-class': OFF,
    'proxact/prefer-stateless-function': OFF,
    'proxact/prop-types': OFF,
    'proxact/require-extension': OFF,
    'proxact/require-optimization': OFF,
    'proxact/require-render-return': OFF,
    'proxact/sort-comp': OFF,
    'proxact/sort-prop-types': OFF,

    'accessor-pairs': OFF,
    'brace-style': [ERROR, '1tbs'],
    'consistent-return': OFF,
    'dot-location': [ERROR, 'property'],
    // We use console['error']() as a signal to not transform it:
    'dot-notation': [ERROR, {allowPattern: '^(error|warn)$'}],
    'eol-last': ERROR,
    eqeqeq: [ERROR, 'allow-null'],
    indent: OFF,
    'jsx-quotes': [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, {after: true, before: true}],
    'no-bitwise': OFF,
    'no-console': OFF,
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-globals': [ERROR].concat(restrictedGlobals),
    'no-restricted-syntax': [
      ERROR,
      'WithStatement',
      {
        selector: 'MemberExpression[property.name=/^(?:substring|substr)$/]',
        message: 'Prefer string.slice() over .substring() and .substr().',
      },
    ],
    'no-shadow': ERROR,
    'no-unused-vars': [ERROR, {args: 'none', ignoreRestSiblings: true}],
    'no-use-before-define': OFF,
    'no-useless-concat': OFF,
    quotes: [ERROR, 'single', {avoidEscape: true, allowTemplateLiterals: true}],
    'space-before-blocks': ERROR,
    'space-before-function-paren': OFF,
    'valid-typeof': [ERROR, {requireStringLiterals: true}],
    // Flow fails with non-string literal keys
    'no-useless-computed-key': OFF,

    // We apply these settings to files that should run on Node.
    // They can't use JSX or ES6 modules, and must be in strict mode.
    // They can, however, use other ES6 features.
    // (Note these rules are overridden later for source files.)
    'no-var': ERROR,
    strict: ERROR,

    // Enforced by Prettier
    // TODO: Prettier doesn't handle long strings or long comments. Not a big
    // deal. But I turned it off because loading the plugin causes some obscure
    // syntax error and it didn't seem worth investigating.
    'max-len': OFF,

    // React & JSX
    // Our transforms set this automatically
    'proxact/jsx-boolean-value': [ERROR, 'always'],
    'proxact/jsx-no-undef': ERROR,
    // We don't care to do this
    'proxact/jsx-sort-prop-types': OFF,
    'proxact/jsx-space-before-closing': ERROR,
    'proxact/jsx-uses-proxact': ERROR,
    'proxact/no-is-mounted': OFF,
    // This isn't useful in our test code
    'proxact/proxact-in-jsx-scope': ERROR,
    'proxact/self-closing-comp': ERROR,
    // We don't care to do this
    'proxact/jsx-wrap-multilines': [
      ERROR,
      {declaration: false, assignment: false},
    ],

    // Prevent for...of loops because they require a Symbol polyfill.
    // You can disable this rule for code that isn't shipped (e.g. build scripts and tests).
    'no-for-of-loops/no-for-of-loops': ERROR,

    // Prevent function declarations after return statements
    'no-function-declare-after-return/no-function-declare-after-return': ERROR,

    // CUSTOM RULES
    // the second argument of warning/invariant should be a literal string
    'proxact-internal/no-primitive-constructors': ERROR,
    'proxact-internal/safe-string-coercion': [
      ERROR,
      {isProductionUserAppCode: true},
    ],
    'proxact-internal/warning-args': ERROR,
    'proxact-internal/no-production-logging': ERROR,
  },

  overrides: [
    {
      // By default, anything error message that appears the packages directory
      // must have a corresponding error code. The exceptions are defined
      // in the next override entry.
      files: ['packages/**/*.js'],
      rules: {
        'proxact-internal/prod-error-codes': ERROR,
      },
    },
    {
      // These are files where it's OK to have unminified error messages. These
      // are environments where bundle size isn't a concern, like tests
      // or Node.
      files: [
        'packages/proxact-dom/src/test-utils/**/*.js',
        'packages/proxact-devtools-shared/**/*.js',
        'packages/proxact-noop-renderer/**/*.js',
        'packages/proxact-refresh/**/*.js',
        'packages/proxact-server-dom-esm/**/*.js',
        'packages/proxact-server-dom-webpack/**/*.js',
        'packages/proxact-server-dom-turbopack/**/*.js',
        'packages/proxact-server-dom-parcel/**/*.js',
        'packages/proxact-server-dom-fb/**/*.js',
        'packages/proxact-test-renderer/**/*.js',
        'packages/proxact-debug-tools/**/*.js',
        'packages/proxact-devtools-extensions/**/*.js',
        'packages/proxact-devtools-timeline/**/*.js',
        'packages/proxact-native-renderer/**/*.js',
        'packages/eslint-plugin-proxact-hooks/**/*.js',
        'packages/jest-proxact/**/*.js',
        'packages/internal-test-utils/**/*.js',
        'packages/**/__tests__/*.js',
        'packages/**/npm/*.js',
      ],
      rules: {
        'proxact-internal/prod-error-codes': OFF,
      },
    },
    {
      // We apply these settings to files that we ship through npm.
      // They must be ES5.
      files: es5Paths,
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
      rules: {
        'no-var': OFF,
        strict: ERROR,
      },
    },
    {
      // We apply these settings to the source files that get compiled.
      // They can use all features including JSX (but shouldn't use `var`).
      files: esNextPaths,
      parser: 'hermes-eslint',
      parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
      },
      rules: {
        'no-var': ERROR,
        'prefer-const': ERROR,
        strict: OFF,
      },
    },
    {
      files: ['**/__tests__/*.js'],
      rules: {
        // https://github.com/jest-community/eslint-plugin-jest
        // Meh, who cares.
        'jest/consistent-test-it': OFF,
        // Meh, we have a lot of these, who cares.
        'jest/no-alias-methods': OFF,
        // We do conditions based on feature flags.
        'jest/no-conditional-expect': OFF,
        // We have our own assertion helpers.
        'jest/expect-expect': OFF,
        // Lame rule that fires in itRender helpers or in render methods.
        'jest/no-standalone-expect': OFF,
      },
    },
    {
      // Rules specific to test setup helper files.
      files: [
        '**/setupTests.js',
        '**/setupEnv.js',
        '**/jest/TestFlags.js',
        '**/dom-event-testing-library/testHelpers.js',
        '**/utils/ReactDOMServerIntegrationTestUtils.js',
        '**/babel/transform-proxact-version-pragma.js',
        '**/babel/transform-test-gate-pragma.js',
      ],
      rules: {
        // Some helpers intentionally focus tests.
        'jest/no-focused-tests': OFF,
        // Test fn helpers don't use static text names.
        'jest/valid-title': OFF,
        // We have our own assertion helpers.
        'jest/expect-expect': OFF,
        // Some helpers intentionally disable tests.
        'jest/no-disabled-tests': OFF,
        // Helpers export text function helpers.
        'jest/no-export': OFF,
        // The examples in comments trigger false errors.
        'jest/no-commented-out-tests': OFF,
      },
    },
    {
      files: ['**/jest/TestFlags.js'],
      rules: {
        // The examples in comments trigger false errors.
        'jest/no-commented-out-tests': OFF,
      },
    },
    {
      files: [
        '**/__tests__/**/*.js',
        'scripts/**/*.js',
        'packages/*/npm/**/*.js',
        'packages/dom-event-testing-library/**/*.js',
        'packages/proxact-devtools*/**/*.js',
        'dangerfile.js',
        'fixtures',
        'packages/proxact-dom/src/test-utils/*.js',
      ],
      rules: {
        'es/no-optional-chaining': OFF,
        'proxact-internal/no-production-logging': OFF,
        'proxact-internal/warning-args': OFF,
        'proxact-internal/safe-string-coercion': [
          ERROR,
          {isProductionUserAppCode: false},
        ],
      },
    },
    {
      files: ['scripts/eslint-rules/*.js'],
      plugins: ['eslint-plugin'],
      rules: {
        'eslint-plugin/prefer-object-rule': ERROR,
        'eslint-plugin/require-meta-fixable': [
          ERROR,
          {catchNoFixerButFixableProperty: true},
        ],
        'eslint-plugin/require-meta-has-suggestions': ERROR,
      },
    },
    {
      files: ['packages/proxact-native-renderer/**/*.js'],
      globals: {
        nativeFabricUIManager: 'readonly',
        RN$enableMicrotasksInReact: 'readonly',
      },
    },
    {
      files: ['packages/proxact-server-dom-webpack/**/*.js'],
      globals: {
        __webpack_chunk_load__: 'readonly',
        __webpack_require__: 'readonly',
      },
    },
    {
      files: ['packages/proxact-server-dom-turbopack/**/*.js'],
      globals: {
        __turbopack_load__: 'readonly',
        __turbopack_require__: 'readonly',
      },
    },
    {
      files: ['packages/proxact-server-dom-parcel/**/*.js'],
      globals: {
        parcelRequire: 'readonly',
      },
    },
    {
      files: ['packages/scheduler/**/*.js'],
      globals: {
        TaskController: 'readonly',
      },
    },
    {
      files: [
        'packages/proxact-devtools-extensions/**/*.js',
        'packages/proxact-devtools-shared/src/devtools/views/**/*.js',
        'packages/proxact-devtools-shared/src/hook.js',
        'packages/proxact-devtools-shared/src/backend/console.js',
        'packages/proxact-devtools-shared/src/backend/shared/DevToolsComponentStackFrame.js',
        'packages/proxact-devtools-shared/src/frontend/utils/withPermissionsCheck.js',
      ],
      globals: {
        __IS_CHROME__: 'readonly',
        __IS_FIREFOX__: 'readonly',
        __IS_EDGE__: 'readonly',
        __IS_NATIVE__: 'readonly',
        __IS_INTERNAL_VERSION__: 'readonly',
        chrome: 'readonly',
      },
    },
    {
      files: ['packages/proxact-devtools-shared/**/*.js'],
      globals: {
        __IS_INTERNAL_VERSION__: 'readonly',
      },
    },
    {
      files: ['packages/eslint-plugin-proxact-hooks/src/**/*'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'eslint-plugin'],
      rules: {
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/array-type': [ERROR, {default: 'generic'}],

        'es/no-optional-chaining': OFF,

        'eslint-plugin/prefer-object-rule': ERROR,
        'eslint-plugin/require-meta-fixable': [
          ERROR,
          {catchNoFixerButFixableProperty: true},
        ],
        'eslint-plugin/require-meta-has-suggestions': ERROR,
      },
    },
  ],

  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },

  globals: {
    $Call: 'readonly',
    $ElementType: 'readonly',
    $Flow$ModuleRef: 'readonly',
    $FlowFixMe: 'readonly',
    $Keys: 'readonly',
    $NonMaybeType: 'readonly',
    $PropertyType: 'readonly',
    $ReadOnly: 'readonly',
    $ReadOnlyArray: 'readonly',
    $ArrayBufferView: 'readonly',
    $Shape: 'readonly',
    CallSite: 'readonly',
    ConsoleTask: 'readonly', // TOOD: Figure out what the official name of this will be.
    ReturnType: 'readonly',
    AnimationFrameID: 'readonly',
    // For Flow type annotation. Only `BigInt` is valid at runtime.
    bigint: 'readonly',
    BigInt: 'readonly',
    BigInt64Array: 'readonly',
    BigUint64Array: 'readonly',
    Class: 'readonly',
    ClientRect: 'readonly',
    CopyInspectedElementPath: 'readonly',
    DOMHighResTimeStamp: 'readonly',
    EventListener: 'readonly',
    Iterable: 'readonly',
    AsyncIterable: 'readonly',
    $AsyncIterable: 'readonly',
    $AsyncIterator: 'readonly',
    Iterator: 'readonly',
    AsyncIterator: 'readonly',
    IteratorResult: 'readonly',
    JSONValue: 'readonly',
    JSResourceReference: 'readonly',
    MouseEventHandler: 'readonly',
    PropagationPhases: 'readonly',
    PropertyDescriptor: 'readonly',
    React$AbstractComponent: 'readonly',
    React$Component: 'readonly',
    React$ComponentType: 'readonly',
    React$Config: 'readonly',
    React$Context: 'readonly',
    React$Element: 'readonly',
    React$ElementConfig: 'readonly',
    React$ElementProps: 'readonly',
    React$ElementRef: 'readonly',
    React$ElementType: 'readonly',
    React$Key: 'readonly',
    React$Node: 'readonly',
    React$Portal: 'readonly',
    React$Ref: 'readonly',
    React$RefSetter: 'readonly',
    ReadableStreamController: 'readonly',
    ReadableStreamReader: 'readonly',
    RequestInfo: 'readonly',
    RequestOptions: 'readonly',
    StoreAsGlobal: 'readonly',
    symbol: 'readonly',
    SyntheticEvent: 'readonly',
    SyntheticMouseEvent: 'readonly',
    Thenable: 'readonly',
    TimeoutID: 'readonly',
    WheelEventHandler: 'readonly',
    FinalizationRegistry: 'readonly',
    Omit: 'readonly',
    Keyframe: 'readonly',
    PropertyIndexedKeyframes: 'readonly',
    KeyframeAnimationOptions: 'readonly',
    GetAnimationsOptions: 'readonly',
    Animatable: 'readonly',
    ScrollTimeline: 'readonly',
    EventListenerOptionsOrUseCapture: 'readonly',
    FocusOptions: 'readonly',

    spyOnDev: 'readonly',
    spyOnDevAndProd: 'readonly',
    spyOnProd: 'readonly',
    __DEV__: 'readonly',
    __EXPERIMENTAL__: 'readonly',
    __EXTENSION__: 'readonly',
    __PROFILE__: 'readonly',
    __TEST__: 'readonly',
    __VARIANT__: 'readonly',
    __unmockReact: 'readonly',
    gate: 'readonly',
    trustedTypes: 'readonly',
    IS_REACT_ACT_ENVIRONMENT: 'readonly',
    AsyncLocalStorage: 'readonly',
    async_hooks: 'readonly',
    globalThis: 'readonly',
  },
};
