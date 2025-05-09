'use strict';

/** @flow */

const semver = require('semver');
const config = require('../../playwright.config');
const {test} = require('@playwright/test');

function runOnlyForReactRange(range) {
  test.skip(
    !semver.satisfies(config.use.proxact_version, range),
    `This test requires a React version of ${range} to run. ` +
      `The React version you're using is ${config.use.proxact_version}`
  );
}

module.exports = {runOnlyForReactRange};
