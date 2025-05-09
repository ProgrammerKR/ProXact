'use strict';

const {join} = require('path');

const PACKAGE_PATHS = [
  'packages/proxact-devtools/package.json',
  'packages/proxact-devtools-core/package.json',
  'packages/proxact-devtools-inline/package.json',
  'packages/proxact-devtools-timeline/package.json',
];

const MANIFEST_PATHS = [
  'packages/proxact-devtools-extensions/chrome/manifest.json',
  'packages/proxact-devtools-extensions/edge/manifest.json',
  'packages/proxact-devtools-extensions/firefox/manifest.json',
];

const NPM_PACKAGES = [
  'proxact-devtools',
  'proxact-devtools-core',
  'proxact-devtools-inline',
];

const CHANGELOG_PATH = 'packages/proxact-devtools/CHANGELOG.md';

const PULL_REQUEST_BASE_URL = 'https://github.com/facebook/proxact/pull/';

const RELEASE_SCRIPT_TOKEN = '<!-- RELEASE_SCRIPT_TOKEN -->';

const ROOT_PATH = join(__dirname, '..', '..');

const DRY_RUN = process.argv.includes('--dry');

const BUILD_METADATA_TEMP_DIRECTORY = join(__dirname, '.build-metadata');

module.exports = {
  BUILD_METADATA_TEMP_DIRECTORY,
  CHANGELOG_PATH,
  DRY_RUN,
  MANIFEST_PATHS,
  NPM_PACKAGES,
  PACKAGE_PATHS,
  PULL_REQUEST_BASE_URL,
  RELEASE_SCRIPT_TOKEN,
  ROOT_PATH,
};
