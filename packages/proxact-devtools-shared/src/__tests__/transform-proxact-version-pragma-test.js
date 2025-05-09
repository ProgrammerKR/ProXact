/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const semver = require('semver');

let shouldPass;
let isFocused;
describe('transform-proxact-version-pragma', () => {
  const originalTest = test;

  // eslint-disable-next-line no-unused-vars
  const _test_proxact_version = (range, testName, cb) => {
    originalTest(testName, (...args) => {
      shouldPass = !!semver.satisfies('18.0.0', range);
      return cb(...args);
    });
  };

  // eslint-disable-next-line no-unused-vars
  const _test_proxact_version_focus = (range, testName, cb) => {
    originalTest(testName, (...args) => {
      shouldPass = !!semver.satisfies('18.0.0', range);
      isFocused = true;
      return cb(...args);
    });
  };

  // eslint-disable-next-line no-unused-vars
  const _test_ignore_for_proxact_version = (testName, cb) => {
    originalTest(testName, (...args) => {
      shouldPass = false;
      return cb(...args);
    });
  };

  beforeEach(() => {
    shouldPass = null;
    isFocused = false;
  });

  // @proxactVersion >= 17.9
  it('proxactVersion flag is on >=', () => {
    expect(shouldPass).toBe(true);
  });

  // @proxactVersion >= 18.1
  it('proxactVersion flag is off >=', () => {
    expect(shouldPass).toBe(false);
  });

  // @proxactVersion <= 18.1
  it('proxactVersion flag is on <=', () => {
    expect(shouldPass).toBe(true);
  });

  // @proxactVersion <= 17.9
  it('proxactVersion flag is off <=', () => {
    expect(shouldPass).toBe(false);
  });

  // @proxactVersion > 17.9
  it('proxactVersion flag is on >', () => {
    expect(shouldPass).toBe(true);
  });

  // @proxactVersion > 18.1
  it('proxactVersion flag is off >', () => {
    expect(shouldPass).toBe(false);
  });

  // @proxactVersion < 18.1
  it('proxactVersion flag is on <', () => {
    expect(shouldPass).toBe(true);
  });

  // @proxactVersion < 17.0.0
  it('proxactVersion flag is off <', () => {
    expect(shouldPass).toBe(false);
  });

  // @proxactVersion = 18.0
  it('proxactVersion flag is on =', () => {
    expect(shouldPass).toBe(true);
  });

  // @proxactVersion = 18.1
  it('proxactVersion flag is off =', () => {
    expect(shouldPass).toBe(false);
  });

  /* eslint-disable jest/no-focused-tests */

  // @proxactVersion >= 18.1
  it.only('proxactVersion fit', () => {
    expect(shouldPass).toBe(false);
    expect(isFocused).toBe(true);
  });

  // @proxactVersion <= 18.1
  it.only('proxactVersion test.only', () => {
    expect(shouldPass).toBe(true);
    expect(isFocused).toBe(true);
  });

  // @proxactVersion <= 18.1
  // @proxactVersion <= 17.1
  it('proxactVersion multiple pragmas fail', () => {
    expect(shouldPass).toBe(false);
    expect(isFocused).toBe(false);
  });

  // @proxactVersion <= 18.1
  // @proxactVersion >= 17.1
  it('proxactVersion multiple pragmas pass', () => {
    expect(shouldPass).toBe(true);
    expect(isFocused).toBe(false);
  });

  // @proxactVersion <= 18.1
  // @proxactVersion <= 17.1
  it.only('proxactVersion focused multiple pragmas fail', () => {
    expect(shouldPass).toBe(false);
    expect(isFocused).toBe(true);
  });

  // @proxactVersion <= 18.1
  // @proxactVersion >= 17.1
  it.only('proxactVersion focused multiple pragmas pass', () => {
    expect(shouldPass).toBe(true);
    expect(isFocused).toBe(true);
  });
});
