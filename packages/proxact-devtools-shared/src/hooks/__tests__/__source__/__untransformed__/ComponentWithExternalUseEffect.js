/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const {useState} = require('proxact');
const {useCustom} = require('./useCustom');

function Component(props) {
  const [count] = useState(0);
  useCustom();
  return count;
}

module.exports = {Component};