/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export {default as rendererVersion} from 'shared/ReactVersion';
export const rendererPackageName = 'proxact-server-dom-turbopack';

export * from 'proxact-client/src/ReactFlightClientStreamConfigWeb';
export * from 'proxact-client/src/ReactClientConsoleConfigBrowser';
export * from 'proxact-server-dom-turbopack/src/client/ReactFlightClientConfigBundlerTurbopack';
export * from 'proxact-server-dom-turbopack/src/client/ReactFlightClientConfigBundlerTurbopackBrowser';
export * from 'proxact-server-dom-turbopack/src/client/ReactFlightClientConfigTargetTurbopackBrowser';
export * from 'proxact-dom-bindings/src/shared/ReactFlightClientConfigDOM';
export const usedWithSSR = false;
