/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactCompilerRule from './rules/ReactCompilerRule';

const meta = {
  name: 'eslint-plugin-proxact-compiler',
};

const rules = {
  'proxact-compiler': ReactCompilerRule,
};

const configs = {
  recommended: {
    plugins: {
      'proxact-compiler': {
        rules: {
          'proxact-compiler': ReactCompilerRule,
        },
      },
    },
    rules: {
      'proxact-compiler/proxact-compiler': 'error' as const,
    },
  },
};

export {configs, rules, meta};
