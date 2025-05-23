/* global chrome */

function fetchResource(url) {
  const reject = value => {
    chrome.runtime.sendMessage({
      source: 'proxact-devtools-fetch-resource-content-script',
      payload: {
        type: 'fetch-file-with-cache-error',
        url,
        value,
      },
    });
  };

  const resolve = value => {
    chrome.runtime.sendMessage({
      source: 'proxact-devtools-fetch-resource-content-script',
      payload: {
        type: 'fetch-file-with-cache-complete',
        url,
        value,
      },
    });
  };

  fetch(url, {cache: 'force-cache'}).then(
    response => {
      if (response.ok) {
        response
          .text()
          .then(text => resolve(text))
          .catch(error => reject(null));
      } else {
        reject(null);
      }
    },
    error => reject(null),
  );
}

chrome.runtime.onMessage.addListener(message => {
  if (
    message?.source === 'devtools-page' &&
    message?.payload?.type === 'fetch-file-with-cache'
  ) {
    fetchResource(message.payload.url);
  }
});
