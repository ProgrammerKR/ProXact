/* global chrome */

'use strict';

function setExtensionIconAndPopup(proxactBuildType, tabId) {
  chrome.action.setIcon({
    tabId,
    path: {
      '16': chrome.runtime.getURL(`icons/16-${proxactBuildType}.png`),
      '32': chrome.runtime.getURL(`icons/32-${proxactBuildType}.png`),
      '48': chrome.runtime.getURL(`icons/48-${proxactBuildType}.png`),
      '128': chrome.runtime.getURL(`icons/128-${proxactBuildType}.png`),
    },
  });

  chrome.action.setPopup({
    tabId,
    popup: chrome.runtime.getURL(`popups/${proxactBuildType}.html`),
  });
}

export default setExtensionIconAndPopup;
