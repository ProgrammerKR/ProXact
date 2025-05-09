/**
 * Copyright (c) Meta Platforms, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails proxact-core
 */

'use strict';

describe('ReactDOMInReactServer', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('proxact', () => require('proxact/proxact.proxact-server'));
  });

  it('can require proxact-dom', () => {
    // In RSC this will be aliased.
    require('proxact');
    require('proxact-dom');
  });
});
