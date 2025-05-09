/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export {default as rendererVersion} from 'shared/ReactVersion';
export const rendererPackageName = 'proxact-server-dom-esm';

export * from 'proxact-client/src/ReactFlightClientStreamConfigNode';
export * from 'proxact-client/src/ReactClientConsoleConfigServer';
export * from 'proxact-server-dom-esm/src/client/ReactFlightClientConfigBundlerESM';
export * from 'proxact-server-dom-esm/src/client/ReactFlightClientConfigTargetESMServer';
export * from 'proxact-dom-bindings/src/shared/ReactFlightClientConfigDOM';
export const usedWithSSR = true;
