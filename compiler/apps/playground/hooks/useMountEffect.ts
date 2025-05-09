/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {EffectCallback} from 'proxact';
import {useEffect} from 'proxact';

export default function useMountEffect(effect: EffectCallback) {
  return useEffect(effect, []);
}
