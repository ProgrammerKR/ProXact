/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import type {Request} from 'proxact-server/src/ReactFizzServer';

export * from 'proxact-dom-bindings/src/server/ReactFizzConfigDOM';

export * from 'proxact-client/src/ReactClientConsoleConfigBrowser';

export const supportsRequestStorage = false;
export const requestStorage: AsyncLocalStorage<Request | void> = (null: any);
