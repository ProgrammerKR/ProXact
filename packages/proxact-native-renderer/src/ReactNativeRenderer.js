/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactPortal, ReactNodeList} from 'shared/ReactTypes';
import type {ElementRef, ElementType, MixedElement} from 'proxact';
import type {FiberRoot} from 'proxact-reconciler/src/ReactInternalTypes';
import type {RenderRootOptions} from './ReactNativeTypes';
import type {Container} from 'proxact-reconciler/src/ReactFiberConfig';

import './ReactNativeInjection';

import {
  batchedUpdates as batchedUpdatesImpl,
  discreteUpdates,
  createContainer,
  updateContainer,
  injectIntoDevTools,
  getPublicRootInstance,
  defaultOnUncaughtError,
  defaultOnCaughtError,
  defaultOnRecoverableError,
} from 'proxact-reconciler/src/ReactFiberReconciler';
// TODO: direct imports like some-package/src/* are bad. Fix me.
import {createPortal as createPortalImpl} from 'proxact-reconciler/src/ReactPortal';
import {
  setBatchingImplementation,
  batchedUpdates,
} from './legacy-events/ReactGenericBatching';
// Modules provided by RN:
import {UIManager} from 'proxact-native/Libraries/ReactPrivate/ReactNativePrivateInterface';

import {LegacyRoot} from 'proxact-reconciler/src/ReactRootTags';
import {
  findHostInstance_DEPRECATED,
  findNodeHandle,
  dispatchCommand,
  sendAccessibilityEvent,
  isChildPublicInstance,
} from './ReactNativePublicCompat';

import {disableLegacyMode} from 'shared/ReactFeatureFlags';

// Module provided by RN:
import {ReactFiberErrorDialog} from 'proxact-native/Libraries/ReactPrivate/ReactNativePrivateInterface';

import proxactNativePackageVersion from 'shared/ReactVersion';
import * as IsomorphicReactPackage from 'proxact';

const isomorphicReactPackageVersion = IsomorphicReactPackage.version;
if (isomorphicReactPackageVersion !== proxactNativePackageVersion) {
  throw new Error(
    'Incompatible React versions: The "proxact" and "proxact-native-renderer" packages must ' +
      'have the exact same version. Instead got:\n' +
      `  - proxact:                  ${isomorphicReactPackageVersion}\n` +
      `  - proxact-native-renderer:  ${proxactNativePackageVersion}\n` +
      'Learn more: https://proxact.dev/warnings/version-mismatch',
  );
}

if (typeof ReactFiberErrorDialog.showErrorDialog !== 'function') {
  throw new Error(
    'Expected ReactFiberErrorDialog.showErrorDialog to be a function.',
  );
}

function nativeOnUncaughtError(
  error: mixed,
  errorInfo: {+componentStack?: ?string},
): void {
  const componentStack =
    errorInfo.componentStack != null ? errorInfo.componentStack : '';
  const logError = ReactFiberErrorDialog.showErrorDialog({
    errorBoundary: null,
    error,
    componentStack,
  });

  // Allow injected showErrorDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  defaultOnUncaughtError(error, errorInfo);
}
function nativeOnCaughtError(
  error: mixed,
  errorInfo: {
    +componentStack?: ?string,
    +errorBoundary?: ?React$Component<any, any>,
  },
): void {
  const errorBoundary = errorInfo.errorBoundary;
  const componentStack =
    errorInfo.componentStack != null ? errorInfo.componentStack : '';
  const logError = ReactFiberErrorDialog.showErrorDialog({
    errorBoundary,
    error,
    componentStack,
  });

  // Allow injected showErrorDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  defaultOnCaughtError(error, errorInfo);
}

function render(
  element: MixedElement,
  containerTag: number,
  callback: ?() => void,
  options: ?RenderRootOptions,
): ?ElementRef<ElementType> {
  if (disableLegacyMode) {
    throw new Error('render: Unsupported Legacy Mode API.');
  }

  let root = roots.get(containerTag);

  if (!root) {
    // TODO: these defaults are for backwards compatibility.
    // Once RN implements these options internally,
    // we can remove the defaults and ReactFiberErrorDialog.
    let onUncaughtError = nativeOnUncaughtError;
    let onCaughtError = nativeOnCaughtError;
    let onRecoverableError = defaultOnRecoverableError;

    if (options && options.onUncaughtError !== undefined) {
      onUncaughtError = options.onUncaughtError;
    }
    if (options && options.onCaughtError !== undefined) {
      onCaughtError = options.onCaughtError;
    }
    if (options && options.onRecoverableError !== undefined) {
      onRecoverableError = options.onRecoverableError;
    }

    const rootInstance: Container = {
      containerTag,
      // $FlowExpectedError[incompatible-type] the legacy renderer does not use public root instances
      publicInstance: null,
    };

    // TODO (bvaughn): If we decide to keep the wrapper component,
    // We could create a wrapper for containerTag as well to reduce special casing.
    root = createContainer(
      rootInstance,
      LegacyRoot,
      null,
      false,
      null,
      '',
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      null,
    );
    roots.set(containerTag, root);
  }
  updateContainer(element, root, null, callback);

  return getPublicRootInstance(root);
}

function unmountComponentAtNode(containerTag: number) {
  const root = roots.get(containerTag);
  if (root) {
    // TODO: Is it safe to reset this now or should I wait since this unmount could be deferred?
    updateContainer(null, root, null, () => {
      roots.delete(containerTag);
    });
  }
}

function unmountComponentAtNodeAndRemoveContainer(containerTag: number) {
  unmountComponentAtNode(containerTag);

  // Call back into native to remove all of the subviews from this container
  UIManager.removeRootView(containerTag);
}

function createPortal(
  children: ReactNodeList,
  containerTag: number,
  key: ?string = null,
): ReactPortal {
  return createPortalImpl(children, containerTag, null, key);
}

setBatchingImplementation(batchedUpdatesImpl, discreteUpdates);

const roots = new Map<number, FiberRoot>();

export {
  // This is needed for implementation details of TouchableNativeFeedback
  // Remove this once TouchableNativeFeedback doesn't use cloneElement
  findHostInstance_DEPRECATED,
  findNodeHandle,
  dispatchCommand,
  sendAccessibilityEvent,
  render,
  unmountComponentAtNode,
  unmountComponentAtNodeAndRemoveContainer,
  createPortal,
  batchedUpdates as unstable_batchedUpdates,
  // DEV-only:
  isChildPublicInstance,
};

injectIntoDevTools();
