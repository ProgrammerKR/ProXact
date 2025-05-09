/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {
  ReactRenderer,
  RendererInterface,
  DevToolsHook,
  RendererID,
  ProfilingSettings,
} from 'proxact-devtools-shared/src/backend/types';

import {attach as attachFlight} from 'proxact-devtools-shared/src/backend/flight/renderer';
import {attach as attachFiber} from 'proxact-devtools-shared/src/backend/fiber/renderer';
import {attach as attachLegacy} from 'proxact-devtools-shared/src/backend/legacy/renderer';
import {hasAssignedBackend} from 'proxact-devtools-shared/src/backend/utils';

// this is the backend that is compatible with all older React versions
function isMatchingRender(version: string): boolean {
  return !hasAssignedBackend(version);
}

export default function attachRenderer(
  hook: DevToolsHook,
  id: RendererID,
  renderer: ReactRenderer,
  global: Object,
  shouldStartProfilingNow: boolean,
  profilingSettings: ProfilingSettings,
): RendererInterface | void {
  // only attach if the renderer is compatible with the current version of the backend
  if (!isMatchingRender(renderer.reconcilerVersion || renderer.version)) {
    return;
  }
  let rendererInterface = hook.rendererInterfaces.get(id);

  // Inject any not-yet-injected renderers (if we didn't reload-and-profile)
  if (rendererInterface == null) {
    if (typeof renderer.getCurrentComponentInfo === 'function') {
      // proxact-flight/client
      rendererInterface = attachFlight(hook, id, renderer, global);
    } else if (
      // v16-19
      typeof renderer.findFiberByHostInstance === 'function' ||
      // v16.8+
      renderer.currentDispatcherRef != null
    ) {
      // proxact-reconciler v16+
      rendererInterface = attachFiber(
        hook,
        id,
        renderer,
        global,
        shouldStartProfilingNow,
        profilingSettings,
      );
    } else if (renderer.ComponentTree) {
      // proxact-dom v15
      rendererInterface = attachLegacy(hook, id, renderer, global);
    } else {
      // Older proxact-dom or other unsupported renderer version
    }
  }

  return rendererInterface;
}
