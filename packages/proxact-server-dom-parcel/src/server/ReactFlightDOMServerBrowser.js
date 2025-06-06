/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactClientValue} from 'proxact-server/src/ReactFlightServer';
import type {ReactFormState, Thenable} from 'shared/ReactTypes';
import {
  preloadModule,
  requireModule,
  resolveServerReference,
  type ServerManifest,
  type ServerReferenceId,
} from '../client/ReactFlightClientConfigBundlerParcel';

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
  close,
  getRoot,
} from 'proxact-server/src/ReactFlightReplyServer';

import {
  decodeAction as decodeActionImpl,
  decodeFormState as decodeFormStateImpl,
} from 'proxact-server/src/ReactFlightActionServer';

export {
  createClientReference,
  registerServerReference,
} from '../ReactFlightParcelReferences';

import type {TemporaryReferenceSet} from 'proxact-server/src/ReactFlightServerTemporaryReferences';

export {createTemporaryReferenceSet} from 'proxact-server/src/ReactFlightServerTemporaryReferences';
export type {TemporaryReferenceSet};

type Options = {
  environmentName?: string | (() => string),
  filterStackFrame?: (url: string, functionName: string) => boolean,
  identifierPrefix?: string,
  signal?: AbortSignal,
  temporaryReferences?: TemporaryReferenceSet,
  onError?: (error: mixed) => void,
  onPostpone?: (reason: string) => void,
};

export function renderToReadableStream(
  model: ReactClientValue,
  options?: Options,
): ReadableStream {
  const request = createRequest(
    model,
    null,
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
      abort(request, (signal: any).reason);
    } else {
      const listener = () => {
        abort(request, (signal: any).reason);
        signal.removeEventListener('abort', listener);
      };
      signal.addEventListener('abort', listener);
    }
  }
  const stream = new ReadableStream(
    {
      type: 'bytes',
      start: (controller): ?Promise<void> => {
        startWork(request);
      },
      pull: (controller): ?Promise<void> => {
        startFlowing(request, controller);
      },
      cancel: (reason): ?Promise<void> => {
        stopFlowing(request);
        abort(request, reason);
      },
    },
    // $FlowFixMe[prop-missing] size() methods are not allowed on byte streams.
    {highWaterMark: 0},
  );
  return stream;
}

type StaticResult = {
  prelude: ReadableStream,
};

export function prerender(
  model: ReactClientValue,
  options?: Options,
): Promise<StaticResult> {
  return new Promise((resolve, reject) => {
    const onFatalError = reject;
    function onAllReady() {
      const stream = new ReadableStream(
        {
          type: 'bytes',
          start: (controller): ?Promise<void> => {
            startWork(request);
          },
          pull: (controller): ?Promise<void> => {
            startFlowing(request, controller);
          },
          cancel: (reason): ?Promise<void> => {
            stopFlowing(request);
            abort(request, reason);
          },
        },
        // $FlowFixMe[prop-missing] size() methods are not allowed on byte streams.
        {highWaterMark: 0},
      );
      resolve({prelude: stream});
    }
    const request = createPrerenderRequest(
      model,
      null,
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

let serverManifest = {};
export function registerServerActions(manifest: ServerManifest) {
  // This function is called by the bundler to register the manifest.
  serverManifest = manifest;
}

export function decodeReply<T>(
  body: string | FormData,
  options?: {temporaryReferences?: TemporaryReferenceSet},
): Thenable<T> {
  if (typeof body === 'string') {
    const form = new FormData();
    form.append('0', body);
    body = form;
  }
  const response = createResponse(
    serverManifest,
    '',
    options ? options.temporaryReferences : undefined,
    body,
  );
  const root = getRoot<T>(response);
  close(response);
  return root;
}

export function decodeAction<T>(body: FormData): Promise<() => T> | null {
  return decodeActionImpl(body, serverManifest);
}

export function decodeFormState<S>(
  actionResult: S,
  body: FormData,
): Promise<ReactFormState<S, ServerReferenceId> | null> {
  return decodeFormStateImpl(actionResult, body, serverManifest);
}

export function loadServerAction<F: (...any[]) => any>(id: string): Promise<F> {
  const reference = resolveServerReference<any>(serverManifest, id);
  return Promise.resolve(reference)
    .then(() => preloadModule(reference))
    .then(() => {
      const fn = requireModule(reference);
      if (typeof fn !== 'function') {
        throw new Error('Server actions must be functions');
      }
      return fn;
    });
}
