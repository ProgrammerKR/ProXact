/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'proxact';
import {createRoot} from 'proxact-dom/client';
import Bridge from 'proxact-devtools-shared/src/bridge';
import Store from 'proxact-devtools-shared/src/devtools/store';
import DevTools from 'proxact-devtools-shared/src/devtools/views/DevTools';

import type {
  BrowserTheme,
  Wall,
} from 'proxact-devtools-shared/src/frontend/types';
import type {FrontendBridge} from 'proxact-devtools-shared/src/bridge';
import type {
  CanViewElementSource,
  TabID,
  ViewAttributeSource,
  ViewElementSource,
} from 'proxact-devtools-shared/src/devtools/views/DevTools';
import type {Config} from 'proxact-devtools-shared/src/devtools/store';

export function createBridge(wall?: Wall): FrontendBridge {
  if (wall != null) {
    return new Bridge(wall);
  }

  return new Bridge({listen: () => {}, send: () => {}});
}

export function createStore(bridge: FrontendBridge, config?: Config): Store {
  return new Store(bridge, {
    checkBridgeProtocolCompatibility: true,
    supportsTraceUpdates: true,
    supportsClickToInspect: true,
    ...config,
  });
}

type InitializationOptions = {
  bridge: FrontendBridge,
  store: Store,
  theme?: BrowserTheme,
  viewAttributeSourceFunction?: ViewAttributeSource,
  viewElementSourceFunction?: ViewElementSource,
  canViewElementSourceFunction?: CanViewElementSource,
};

function initializeTab(
  tab: TabID,
  contentWindow: Element | Document,
  options: InitializationOptions,
) {
  const {
    bridge,
    store,
    theme = 'light',
    viewAttributeSourceFunction,
    viewElementSourceFunction,
    canViewElementSourceFunction,
  } = options;
  const root = createRoot(contentWindow);

  root.render(
    <DevTools
      bridge={bridge}
      browserTheme={theme}
      store={store}
      showTabBar={false}
      overrideTab={tab}
      warnIfLegacyBackendDetected={true}
      enabledInspectedElementContextMenu={true}
      viewAttributeSourceFunction={viewAttributeSourceFunction}
      viewElementSourceFunction={viewElementSourceFunction}
      canViewElementSourceFunction={canViewElementSourceFunction}
    />,
  );
}

export function initializeComponents(
  contentWindow: Element | Document,
  options: InitializationOptions,
): void {
  initializeTab('components', contentWindow, options);
}

export function initializeProfiler(
  contentWindow: Element | Document,
  options: InitializationOptions,
): void {
  initializeTab('profiler', contentWindow, options);
}
