/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {
  Request,
  ReactClientValue,
} from 'proxact-server/src/ReactFlightServer';
import type {Destination} from 'proxact-server/src/ReactServerStreamConfigNode';
import type {ClientManifest} from './ReactFlightServerConfigWebpackBundler';
import type {ServerManifest} from 'proxact-client/src/ReactFlightClientConfig';
import type {Busboy} from 'busboy';
import type {Writable} from 'stream';
import type {Thenable} from 'shared/ReactTypes';

import {Readable} from 'stream';

import {
  createRequest,
  createPrerenderRequest,
  startWork,
  startFlowing,
  stopFlowing,
  abort,
} from 'proxact-server/src/ReactFlightServer';

import {
  createResponse,
  reportGlobalError,
  close,
  resolveField,
  resolveFileInfo,
  resolveFileChunk,
  resolveFileComplete,
  getRoot,
} from 'proxact-server/src/ReactFlightReplyServer';

import {
  decodeAction,
  decodeFormState,
} from 'proxact-server/src/ReactFlightActionServer';

export {
  registerServerReference,
  registerClientReference,
  createClientModuleProxy,
} from '../ReactFlightWebpackReferences';

import type {TemporaryReferenceSet} from 'proxact-server/src/ReactFlightServerTemporaryReferences';

export {createTemporaryReferenceSet} from 'proxact-server/src/ReactFlightServerTemporaryReferences';

export type {TemporaryReferenceSet};

function createDrainHandler(destination: Destination, request: Request) {
  return () => startFlowing(request, destination);
}

function createCancelHandler(request: Request, reason: string) {
  return () => {
    stopFlowing(request);
    abort(request, new Error(reason));
  };
}

type Options = {
  environmentName?: string | (() => string),
  filterStackFrame?: (url: string, functionName: string) => boolean,
  onError?: (error: mixed) => void,
  onPostpone?: (reason: string) => void,
  identifierPrefix?: string,
  temporaryReferences?: TemporaryReferenceSet,
};

type PipeableStream = {
  abort(reason: mixed): void,
  pipe<T: Writable>(destination: T): T,
};

function renderToPipeableStream(
  model: ReactClientValue,
  webpackMap: ClientManifest,
  options?: Options,
): PipeableStream {
  const request = createRequest(
    model,
    webpackMap,
    options ? options.onError : undefined,
    options ? options.identifierPrefix : undefined,
    options ? options.onPostpone : undefined,
    options ? options.temporaryReferences : undefined,
    __DEV__ && options ? options.environmentName : undefined,
    __DEV__ && options ? options.filterStackFrame : undefined,
  );
  let hasStartedFlowing = false;
  startWork(request);
  return {
    pipe<T: Writable>(destination: T): T {
      if (hasStartedFlowing) {
        throw new Error(
          'React currently only supports piping to one writable stream.',
        );
      }
      hasStartedFlowing = true;
      startFlowing(request, destination);
      destination.on('drain', createDrainHandler(destination, request));
      destination.on(
        'error',
        createCancelHandler(
          request,
          'The destination stream errored while writing data.',
        ),
      );
      destination.on(
        'close',
        createCancelHandler(request, 'The destination stream closed early.'),
      );
      return destination;
    },
    abort(reason: mixed) {
      abort(request, reason);
    },
  };
}

function createFakeWritable(readable: any): Writable {
  // The current host config expects a Writable so we create
  // a fake writable for now to push into the Readable.
  return ({
    write(chunk) {
      return readable.push(chunk);
    },
    end() {
      readable.push(null);
    },
    destroy(error) {
      readable.destroy(error);
    },
  }: any);
}

type PrerenderOptions = {
  environmentName?: string | (() => string),
  filterStackFrame?: (url: string, functionName: string) => boolean,
  onError?: (error: mixed) => void,
  onPostpone?: (reason: string) => void,
  identifierPrefix?: string,
  temporaryReferences?: TemporaryReferenceSet,
  signal?: AbortSignal,
};

type StaticResult = {
  prelude: Readable,
};

function prerenderToNodeStream(
  model: ReactClientValue,
  webpackMap: ClientManifest,
  options?: PrerenderOptions,
): Promise<StaticResult> {
  return new Promise((resolve, reject) => {
    const onFatalError = reject;
    function onAllReady() {
      const readable: Readable = new Readable({
        read() {
          startFlowing(request, writable);
        },
      });
      const writable = createFakeWritable(readable);
      resolve({prelude: readable});
    }

    const request = createPrerenderRequest(
      model,
      webpackMap,
      onAllReady,
      onFatalError,
      options ? options.onError : undefined,
      options ? options.identifierPrefix : undefined,
      options ? options.onPostpone : undefined,
      options ? options.temporaryReferences : undefined,
      __DEV__ && options ? options.environmentName : undefined,
      __DEV__ && options ? options.filterStackFrame : undefined,
    );
    if (options && options.signal) {
      const signal = options.signal;
      if (signal.aborted) {
        const reason = (signal: any).reason;
        abort(request, reason);
      } else {
        const listener = () => {
          const reason = (signal: any).reason;
          abort(request, reason);
          signal.removeEventListener('abort', listener);
        };
        signal.addEventListener('abort', listener);
      }
    }
    startWork(request);
  });
}

function decodeReplyFromBusboy<T>(
  busboyStream: Busboy,
  webpackMap: ServerManifest,
  options?: {temporaryReferences?: TemporaryReferenceSet},
): Thenable<T> {
  const response = createResponse(
    webpackMap,
    '',
    options ? options.temporaryReferences : undefined,
  );
  let pendingFiles = 0;
  const queuedFields: Array<string> = [];
  busboyStream.on('field', (name, value) => {
    if (pendingFiles > 0) {
      // Because the 'end' event fires two microtasks after the next 'field'
      // we would resolve files and fields out of order. To handle this properly
      // we queue any fields we receive until the previous file is done.
      queuedFields.push(name, value);
    } else {
      resolveField(response, name, value);
    }
  });
  busboyStream.on('file', (name, value, {filename, encoding, mimeType}) => {
    if (encoding.toLowerCase() === 'base64') {
      throw new Error(
        "React doesn't accept base64 encoded file uploads because we don't expect " +
          "form data passed from a browser to ever encode data that way. If that's " +
          'the wrong assumption, we can easily fix it.',
      );
    }
    pendingFiles++;
    const file = resolveFileInfo(response, name, filename, mimeType);
    value.on('data', chunk => {
      resolveFileChunk(response, file, chunk);
    });
    value.on('end', () => {
      resolveFileComplete(response, name, file);
      pendingFiles--;
      if (pendingFiles === 0) {
        // Release any queued fields
        for (let i = 0; i < queuedFields.length; i += 2) {
          resolveField(response, queuedFields[i], queuedFields[i + 1]);
        }
        queuedFields.length = 0;
      }
    });
  });
  busboyStream.on('finish', () => {
    close(response);
  });
  busboyStream.on('error', err => {
    reportGlobalError(
      response,
      // $FlowFixMe[incompatible-call] types Error and mixed are incompatible
      err,
    );
  });
  return getRoot(response);
}

function decodeReply<T>(
  body: string | FormData,
  webpackMap: ServerManifest,
  options?: {temporaryReferences?: TemporaryReferenceSet},
): Thenable<T> {
  if (typeof body === 'string') {
    const form = new FormData();
    form.append('0', body);
    body = form;
  }
  const response = createResponse(
    webpackMap,
    '',
    options ? options.temporaryReferences : undefined,
    body,
  );
  const root = getRoot<T>(response);
  close(response);
  return root;
}

export {
  renderToPipeableStream,
  prerenderToNodeStream,
  decodeReplyFromBusboy,
  decodeReply,
  decodeAction,
  decodeFormState,
};
