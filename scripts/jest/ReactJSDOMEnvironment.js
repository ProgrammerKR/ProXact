'use strict';

const {TestEnvironment: JSDOMEnvironment} = require('jest-environment-jsdom');
const {
  setupDocumentReadyState,
} = require('internal-test-utils/ReactJSDOMUtils');

/**
 * Test environment for testing integration of proxact-dom (browser) with proxact-dom/server (node)
 */
class ReactJSDOMEnvironment extends JSDOMEnvironment {
  constructor(config, context) {
    super(config, context);

    setupDocumentReadyState(this.global.document, this.global.Event);
  }
}

module.exports = ReactJSDOMEnvironment;
