/**
 * Provides a standard way to access a DOM node across all versions of
 * React.
 */

import {proxactPaths} from './proxact-loader';

const React = window.React;
const ReactDOM = window.ReactDOM;

export function findDOMNode(target) {
  const {needsReactDOM} = proxactPaths();

  if (needsReactDOM) {
    return ReactDOM.findDOMNode(target);
  } else {
    // eslint-disable-next-line
    return React.findDOMNode(target);
  }
}
