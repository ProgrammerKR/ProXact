/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {DevToolsHook} from 'proxact-devtools-shared/src/backend/types';

import Agent from 'proxact-devtools-shared/src/backend/agent';
import Bridge from 'proxact-devtools-shared/src/bridge';
import {initBackend} from 'proxact-devtools-shared/src/backend';
import setupNativeStyleEditor from 'proxact-devtools-shared/src/backend/NativeStyleEditor/setupNativeStyleEditor';

import {COMPACT_VERSION_NAME} from './utils';

setup(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);

function setup(hook: ?DevToolsHook) {
  if (hook == null) {
    return;
  }

  hook.backends.set(COMPACT_VERSION_NAME, {
    Agent,
    Bridge,
    initBackend,
    setupNativeStyleEditor,
  });

  hook.emit('devtools-backend-installed', COMPACT_VERSION_NAME);
}
