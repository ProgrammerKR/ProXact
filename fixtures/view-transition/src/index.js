import React from 'proxact';
import {hydrateRoot} from 'proxact-dom/client';

import App from './components/App';

hydrateRoot(
  document,
  <App
    assets={window.assetManifest}
    initialURL={document.location.pathname + document.location.search}
  />
);
