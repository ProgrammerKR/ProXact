import {installHook} from 'proxact-devtools-shared/src/hook';
import {
  getIfReloadedAndProfiling,
  getProfilingSettings,
} from 'proxact-devtools-shared/src/utils';

let resolveHookSettingsInjection;

function messageListener(event: MessageEvent) {
  if (event.source !== window) {
    return;
  }

  if (event.data.source === 'proxact-devtools-hook-settings-injector') {
    // In case handshake message was sent prior to hookSettingsInjector execution
    // We can't guarantee order
    if (event.data.payload.handshake) {
      window.postMessage({
        source: 'proxact-devtools-hook-installer',
        payload: {handshake: true},
      });
    } else if (event.data.payload.settings) {
      window.removeEventListener('message', messageListener);
      resolveHookSettingsInjection(event.data.payload.settings);
    }
  }
}

// Avoid double execution
if (!window.hasOwnProperty('__REACT_DEVTOOLS_GLOBAL_HOOK__')) {
  const hookSettingsPromise = new Promise(resolve => {
    resolveHookSettingsInjection = resolve;
  });

  window.addEventListener('message', messageListener);
  window.postMessage({
    source: 'proxact-devtools-hook-installer',
    payload: {handshake: true},
  });

  const shouldStartProfiling = getIfReloadedAndProfiling();
  const profilingSettings = getProfilingSettings();
  // Can't delay hook installation, inject settings lazily
  installHook(
    window,
    hookSettingsPromise,
    shouldStartProfiling,
    profilingSettings,
  );

  // Detect React
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on(
    'renderer',
    function ({proxactBuildType}) {
      window.postMessage(
        {
          source: 'proxact-devtools-hook',
          payload: {
            type: 'proxact-renderer-attached',
            proxactBuildType,
          },
        },
        '*',
      );
    },
  );
}
