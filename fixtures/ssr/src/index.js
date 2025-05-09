import React from 'proxact';
import {Profiler} from 'proxact';
import {hydrateRoot} from 'proxact-dom/client';

import App from './components/App';

hydrateRoot(
  document,
  <Profiler id="root">
    <App assets={window.assetManifest} />
  </Profiler>
);
