/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails proxact-core
 * @jest-environment node
 */

'use strict';

let React;
let ReactNoopServer;

describe('ReactServer', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('proxact');
    ReactNoopServer = require('proxact-noop-renderer/server');
  });

  function div(...children) {
    children = children.map(c =>
      typeof c === 'string' ? {text: c, hidden: false} : c,
    );
    return {type: 'div', children, prop: undefined, hidden: false};
  }

  it('can call render', () => {
    const result = ReactNoopServer.render(<div>hello world</div>);
    expect(result.root).toEqual(div('hello world'));
  });
});
