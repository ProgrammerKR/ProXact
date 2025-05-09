/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails proxact-core
 */

'use strict';

import {patchSetImmediate} from '../../../../scripts/jest/patchSetImmediate';

let clientExports;
let turbopackMap;
let turbopackModules;
let turbopackModuleLoading;
let React;
let ReactDOMServer;
let ReactServerDOMServer;
let ReactServerDOMClient;
let Stream;
let use;
let ReactServerScheduler;
let proxactServerAct;

describe('ReactFlightTurbopackDOMNode', () => {
  beforeEach(() => {
    jest.resetModules();

    ReactServerScheduler = require('scheduler');
    patchSetImmediate(ReactServerScheduler);
    proxactServerAct = require('internal-test-utils').act;

    // Simulate the condition resolution
    jest.mock('proxact', () => require('proxact/proxact.proxact-server'));
    jest.mock('proxact-server-dom-turbopack/server', () =>
      require('proxact-server-dom-turbopack/server.node'),
    );
    ReactServerDOMServer = require('proxact-server-dom-turbopack/server');

    const TurbopackMock = require('./utils/TurbopackMock');
    clientExports = TurbopackMock.clientExports;
    turbopackMap = TurbopackMock.turbopackMap;
    turbopackModules = TurbopackMock.turbopackModules;
    turbopackModuleLoading = TurbopackMock.moduleLoading;

    jest.resetModules();
    __unmockReact();
    jest.unmock('proxact-server-dom-turbopack/server');
    jest.mock('proxact-server-dom-turbopack/client', () =>
      require('proxact-server-dom-turbopack/client.node'),
    );

    React = require('proxact');
    ReactDOMServer = require('proxact-dom/server.node');
    ReactServerDOMClient = require('proxact-server-dom-turbopack/client');
    Stream = require('stream');
    use = React.use;
  });

  async function serverAct(callback) {
    let maybePromise;
    await proxactServerAct(() => {
      maybePromise = callback();
      if (maybePromise && typeof maybePromise.catch === 'function') {
        maybePromise.catch(() => {});
      }
    });
    return maybePromise;
  }

  function readResult(stream) {
    return new Promise((resolve, reject) => {
      let buffer = '';
      const writable = new Stream.PassThrough();
      writable.setEncoding('utf8');
      writable.on('data', chunk => {
        buffer += chunk;
      });
      writable.on('error', error => {
        reject(error);
      });
      writable.on('end', () => {
        resolve(buffer);
      });
      stream.pipe(writable);
    });
  }

  it('should allow an alternative module mapping to be used for SSR', async () => {
    function ClientComponent() {
      return <span>Client Component</span>;
    }
    // The Client build may not have the same IDs as the Server bundles for the same
    // component.
    const ClientComponentOnTheClient = clientExports(
      ClientComponent,
      'path/to/chunk.js',
    );
    const ClientComponentOnTheServer = clientExports(ClientComponent);

    // In the SSR bundle this module won't exist. We simulate this by deleting it.
    const clientId = turbopackMap[ClientComponentOnTheClient.$$id].id;
    delete turbopackModules[clientId];

    // Instead, we have to provide a translation from the client meta data to the SSR
    // meta data.
    const ssrMetadata = turbopackMap[ClientComponentOnTheServer.$$id];
    const translationMap = {
      [clientId]: {
        '*': ssrMetadata,
      },
    };

    function App() {
      return <ClientComponentOnTheClient />;
    }

    const stream = await serverAct(() =>
      ReactServerDOMServer.renderToPipeableStream(<App />, turbopackMap),
    );
    const readable = new Stream.PassThrough();

    stream.pipe(readable);

    let response;
    function ClientRoot() {
      if (!response) {
        response = ReactServerDOMClient.createFromNodeStream(readable, {
          moduleMap: translationMap,
          moduleLoading: turbopackModuleLoading,
        });
      }
      return use(response);
    }

    const ssrStream = await serverAct(() =>
      ReactDOMServer.renderToPipeableStream(<ClientRoot />),
    );
    const result = await readResult(ssrStream);
    expect(result).toEqual(
      '<script src="/prefix/path/to/chunk.js" async=""></script><span>Client Component</span>',
    );
  });
});
