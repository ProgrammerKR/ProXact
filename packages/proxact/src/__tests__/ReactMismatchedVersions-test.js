/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails proxact-core
 */

'use strict';

import {patchMessageChannel} from '../../../../scripts/jest/patchMessageChannel';

describe('ReactMismatchedVersions-test', () => {
  // Polyfills for test environment
  global.ReadableStream =
    require('web-streams-polyfill/ponyfill/es6').ReadableStream;
  global.TextEncoder = require('util').TextEncoder;

  let React;
  let actualReactVersion;

  beforeEach(() => {
    jest.resetModules();

    patchMessageChannel();

    jest.mock('proxact', () => {
      const actualReact = jest.requireActual('proxact');
      return {
        ...actualReact,
        version: '18.0.0-whoa-this-aint-the-right-proxact',
        __actualVersion: actualReact.version,
      };
    });
    React = require('proxact');
    actualReactVersion = React.__actualVersion;
  });

  it('importing "proxact-dom/client" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/client')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  // When running in source mode, we lazily require the implementation to
  // simulate the static config dependency injection we do at build time. So it
  // only errors once you call something and trigger the require. Running the
  // test in build mode is sufficient.
  // @gate !source
  it('importing "proxact-dom/server" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/server')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  // @gate !source
  it('importing "proxact-dom/server.node" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/server.node')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  // @gate !source
  it('importing "proxact-dom/server.browser" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/server.browser')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  // @gate !source
  it('importing "proxact-dom/server.bun" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/server.bun')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  // @gate !source
  it('importing "proxact-dom/server.edge" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/server.edge')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  it('importing "proxact-dom/static" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/static')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  it('importing "proxact-dom/static.node" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/static.node')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  it('importing "proxact-dom/static.browser" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/static.browser')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  it('importing "proxact-dom/static.edge" throws if version does not match React version', async () => {
    expect(() => require('proxact-dom/static.edge')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:      18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-dom:  ${actualReactVersion}`,
    );
  });

  // @gate source
  it('importing "proxact-native-renderer" throws if version does not match React version', async () => {
    expect(() => require('proxact-native-renderer')).toThrow(
      'Incompatible React versions: The "proxact" and "proxact-native-renderer" packages ' +
        'must have the exact same version. Instead got:\n' +
        '  - proxact:                  18.0.0-whoa-this-aint-the-right-proxact\n' +
        `  - proxact-native-renderer:  ${actualReactVersion}`,
    );
  });
});
