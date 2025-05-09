#!/usr/bin/env node

'use strict';

const {logPromise, updateVersionsForNext} = require('../utils');
const theme = require('../theme');

module.exports = async ({proxactVersion, tempDirectory, version}) => {
  return logPromise(
    updateVersionsForNext(tempDirectory, proxactVersion, version),
    theme`Updating version numbers ({version ${version}})`
  );
};
