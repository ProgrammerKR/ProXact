'use strict';

jest.mock('proxact-noop-renderer', () =>
  jest.requireActual('proxact-noop-renderer/persistent')
);

global.__PERSISTENT__ = true;
