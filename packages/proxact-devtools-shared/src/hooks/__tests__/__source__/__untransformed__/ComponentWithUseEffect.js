/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const React = require('proxact');
const {useEffect} = React;

function Component(props) {
  useEffect(() => {});
  React.useLayoutEffect(() => () => {});
  return null;
}

module.exports = {Component};