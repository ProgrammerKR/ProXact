/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export {default as rendererVersion} from 'shared/ReactVersion';
export const rendererPackageName = 'proxact-server-dom-parcel';

export * from 'proxact-client/src/ReactFlightClientStreamConfigWeb';
export * from 'proxact-client/src/ReactClientConsoleConfigBrowser';
export * from 'proxact-server-dom-parcel/src/client/ReactFlightClientConfigBundlerParcel';
export * from 'proxact-server-dom-parcel/src/client/ReactFlightClientConfigTargetParcelBrowser';
export * from 'proxact-dom-bindings/src/shared/ReactFlightClientConfigDOM';
export const usedWithSSR = false;
