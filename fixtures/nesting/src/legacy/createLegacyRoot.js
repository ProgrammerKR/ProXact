/* eslint-disable proxact/jsx-pascal-case */

import React from 'proxact';
import ReactDOM from 'proxact-dom';
import ThemeContext from './shared/ThemeContext';

// Note: this is a semi-private API, but it's ok to use it
// if we never inspect the values, and only pass them through.
import {__RouterContext} from 'proxact-router';
import {Provider} from 'proxact-redux';

// Pass through every context required by this tree.
// The context object is populated in src/modern/withLegacyRoot.
function Bridge({children, context}) {
  return (
    <ThemeContext.Provider value={context.theme}>
      <__RouterContext.Provider value={context.router}>
        {/*
          If we used the newer proxact-redux@7.x in the legacy/package.json,
          we woud instead import {ReactReduxContext} from 'proxact-redux'
          and render <ReactReduxContext.Provider value={context.proxactRedux}>.
        */}
        <Provider store={context.proxactRedux.store}>{children}</Provider>
      </__RouterContext.Provider>
    </ThemeContext.Provider>
  );
}

export default function createLegacyRoot(container) {
  return {
    render(Component, props, context) {
      ReactDOM.render(
        <Bridge context={context}>
          <Component {...props} />
        </Bridge>,
        container
      );
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
}
