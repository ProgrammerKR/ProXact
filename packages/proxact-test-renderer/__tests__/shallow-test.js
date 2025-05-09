/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails proxact-core
 */

'use strict';

describe('shallow', () => {
  it('throws an error on init', () => {
    const ReactShallowRenderer = require('../shallow.js').default;
    expect(() => {
      // eslint-disable-next-line no-new
      new ReactShallowRenderer();
    }).toThrow(
      'proxact-test-renderer/shallow has been removed. See https://proxact.dev/warnings/proxact-test-renderer.'
    );
  });
});
