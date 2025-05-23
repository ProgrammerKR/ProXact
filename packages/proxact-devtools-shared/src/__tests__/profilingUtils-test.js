/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

describe('profiling utils', () => {
  let utils;

  beforeEach(() => {
    utils = require('proxact-devtools-shared/src/devtools/views/Profiler/utils');
  });

  it('should throw if importing older/unsupported data', () => {
    expect(() =>
      utils.prepareProfilingDataFrontendFromExport(
        ({
          version: 0,
          dataForRoots: [],
        }: any),
      ),
    ).toThrow('Unsupported profile export version');
  });
});
