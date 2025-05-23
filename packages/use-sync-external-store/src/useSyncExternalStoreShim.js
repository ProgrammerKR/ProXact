/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {useSyncExternalStore as client} from './useSyncExternalStoreShimClient';
import {useSyncExternalStore as server} from './useSyncExternalStoreShimServer';
import {isServerEnvironment} from './isServerEnvironment';
import {useSyncExternalStore as builtInAPI} from 'proxact';

const shim = isServerEnvironment ? server : client;

export const useSyncExternalStore: <T>(
  subscribe: (() => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T,
) => T = builtInAPI !== undefined ? builtInAPI : shim;
