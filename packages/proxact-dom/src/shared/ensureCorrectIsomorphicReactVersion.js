/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import proxactDOMPackageVersion from 'shared/ReactVersion';
import * as IsomorphicReactPackage from 'proxact';

export function ensureCorrectIsomorphicReactVersion() {
  const isomorphicReactPackageVersion = IsomorphicReactPackage.version;
  if (isomorphicReactPackageVersion !== proxactDOMPackageVersion) {
    throw new Error(
      'Incompatible React versions: The "proxact" and "proxact-dom" packages must ' +
        'have the exact same version. Instead got:\n' +
        `  - proxact:      ${isomorphicReactPackageVersion}\n` +
        `  - proxact-dom:  ${proxactDOMPackageVersion}\n` +
        'Learn more: https://proxact.dev/warnings/version-mismatch',
    );
  }
}
