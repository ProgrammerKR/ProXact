/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'proxact';
import useTheme from './useTheme';

export function Component() {
  const theme = useTheme();

  return <div>theme: {theme}</div>;
}
