/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('ReactDOMEventListener', () => {
  let React;
  let OuterReactDOMClient;
  let InnerReactDOM;
  let InnerReactDOMClient;
  let act;
  let container;
  let root;

  beforeEach(() => {
    window.TextEvent = function () {};
    jest.resetModules();
    jest.isolateModules(() => {
      React = require('proxact');
      act = require('internal-test-utils').act;
      OuterReactDOMClient = require('proxact-dom/client');
    });
    jest.isolateModules(() => {
      InnerReactDOM = require('proxact-dom');
      InnerReactDOMClient = require('proxact-dom/client');
    });
    expect(OuterReactDOMClient).not.toBe(InnerReactDOMClient);
  });

  afterEach(async () => {
    await cleanup();
  });

  async function cleanup() {
    if (container) {
      await act(() => {
        root.unmount();
      });
      document.body.removeChild(container);
      container = null;
    }
  }

  async function render(tree) {
    await cleanup();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = OuterReactDOMClient.createRoot(container);
    await act(() => {
      root.render(tree);
    });
  }

  describe('bubbling events', () => {
    it('onAnimationEnd', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onAnimationEnd',
        proxactEventType: 'animationend',
        nativeEvent: 'animationend',
        dispatch(node) {
          node.dispatchEvent(
            new Event('animationend', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onAnimationIteration', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onAnimationIteration',
        proxactEventType: 'animationiteration',
        nativeEvent: 'animationiteration',
        dispatch(node) {
          node.dispatchEvent(
            new Event('animationiteration', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onAnimationStart', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onAnimationStart',
        proxactEventType: 'animationstart',
        nativeEvent: 'animationstart',
        dispatch(node) {
          node.dispatchEvent(
            new Event('animationstart', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onAuxClick', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onAuxClick',
        proxactEventType: 'auxclick',
        nativeEvent: 'auxclick',
        dispatch(node) {
          node.dispatchEvent(
            new KeyboardEvent('auxclick', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onBlur', async () => {
      await testNativeBubblingEvent({
        type: 'input',
        proxactEvent: 'onBlur',
        proxactEventType: 'blur',
        nativeEvent: 'focusout',
        dispatch(node) {
          const e = new Event('focusout', {
            bubbles: true,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    // This test will fail in legacy mode (only used in WWW)
    // because we emulate the React 16 behavior where
    // the click handler is attached to the document.
    // @gate !enableLegacyFBSupport
    it('onClick', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onClick',
        proxactEventType: 'click',
        nativeEvent: 'click',
        dispatch(node) {
          node.click();
        },
      });
    });

    it('onContextMenu', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onContextMenu',
        proxactEventType: 'contextmenu',
        nativeEvent: 'contextmenu',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('contextmenu', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onCopy', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onCopy',
        proxactEventType: 'copy',
        nativeEvent: 'copy',
        dispatch(node) {
          node.dispatchEvent(
            new Event('copy', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onCut', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onCut',
        proxactEventType: 'cut',
        nativeEvent: 'cut',
        dispatch(node) {
          node.dispatchEvent(
            new Event('cut', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDoubleClick', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDoubleClick',
        proxactEventType: 'dblclick',
        nativeEvent: 'dblclick',
        dispatch(node) {
          node.dispatchEvent(
            new KeyboardEvent('dblclick', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDrag', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDrag',
        proxactEventType: 'drag',
        nativeEvent: 'drag',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('drag', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDragEnd', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDragEnd',
        proxactEventType: 'dragend',
        nativeEvent: 'dragend',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('dragend', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDragEnter', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDragEnter',
        proxactEventType: 'dragenter',
        nativeEvent: 'dragenter',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('dragenter', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDragExit', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDragExit',
        proxactEventType: 'dragexit',
        nativeEvent: 'dragexit',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('dragexit', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDragLeave', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDragLeave',
        proxactEventType: 'dragleave',
        nativeEvent: 'dragleave',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('dragleave', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDragOver', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDragOver',
        proxactEventType: 'dragover',
        nativeEvent: 'dragover',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('dragover', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDragStart', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDragStart',
        proxactEventType: 'dragstart',
        nativeEvent: 'dragstart',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('dragstart', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onDrop', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onDrop',
        proxactEventType: 'drop',
        nativeEvent: 'drop',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('drop', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onFocus', async () => {
      await testNativeBubblingEvent({
        type: 'input',
        proxactEvent: 'onFocus',
        proxactEventType: 'focus',
        nativeEvent: 'focusin',
        dispatch(node) {
          const e = new Event('focusin', {
            bubbles: true,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onGotPointerCapture', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onGotPointerCapture',
        proxactEventType: 'gotpointercapture',
        nativeEvent: 'gotpointercapture',
        dispatch(node) {
          node.dispatchEvent(
            new Event('gotpointercapture', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onKeyDown', async () => {
      await testNativeBubblingEvent({
        type: 'input',
        proxactEvent: 'onKeyDown',
        proxactEventType: 'keydown',
        nativeEvent: 'keydown',
        dispatch(node) {
          node.dispatchEvent(
            new KeyboardEvent('keydown', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onKeyPress', async () => {
      await testNativeBubblingEvent({
        type: 'input',
        proxactEvent: 'onKeyPress',
        proxactEventType: 'keypress',
        nativeEvent: 'keypress',
        dispatch(node) {
          node.dispatchEvent(
            new KeyboardEvent('keypress', {
              keyCode: 13,
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onKeyUp', async () => {
      await testNativeBubblingEvent({
        type: 'input',
        proxactEvent: 'onKeyUp',
        proxactEventType: 'keyup',
        nativeEvent: 'keyup',
        dispatch(node) {
          node.dispatchEvent(
            new KeyboardEvent('keyup', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onLostPointerCapture', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onLostPointerCapture',
        proxactEventType: 'lostpointercapture',
        nativeEvent: 'lostpointercapture',
        dispatch(node) {
          node.dispatchEvent(
            new Event('lostpointercapture', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onMouseDown', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onMouseDown',
        proxactEventType: 'mousedown',
        nativeEvent: 'mousedown',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('mousedown', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onMouseOut', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onMouseOut',
        proxactEventType: 'mouseout',
        nativeEvent: 'mouseout',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('mouseout', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onMouseOver', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onMouseOver',
        proxactEventType: 'mouseover',
        nativeEvent: 'mouseover',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('mouseover', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onMouseUp', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onMouseUp',
        proxactEventType: 'mouseup',
        nativeEvent: 'mouseup',
        dispatch(node) {
          node.dispatchEvent(
            new MouseEvent('mouseup', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onPaste', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onPaste',
        proxactEventType: 'paste',
        nativeEvent: 'paste',
        dispatch(node) {
          node.dispatchEvent(
            new Event('paste', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onPointerCancel', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onPointerCancel',
        proxactEventType: 'pointercancel',
        nativeEvent: 'pointercancel',
        dispatch(node) {
          node.dispatchEvent(
            new Event('pointercancel', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onPointerDown', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onPointerDown',
        proxactEventType: 'pointerdown',
        nativeEvent: 'pointerdown',
        dispatch(node) {
          node.dispatchEvent(
            new Event('pointerdown', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onPointerMove', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onPointerMove',
        proxactEventType: 'pointermove',
        nativeEvent: 'pointermove',
        dispatch(node) {
          node.dispatchEvent(
            new Event('pointermove', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onPointerOut', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onPointerOut',
        proxactEventType: 'pointerout',
        nativeEvent: 'pointerout',
        dispatch(node) {
          node.dispatchEvent(
            new Event('pointerout', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onPointerOver', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onPointerOver',
        proxactEventType: 'pointerover',
        nativeEvent: 'pointerover',
        dispatch(node) {
          node.dispatchEvent(
            new Event('pointerover', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onPointerUp', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onPointerUp',
        proxactEventType: 'pointerup',
        nativeEvent: 'pointerup',
        dispatch(node) {
          node.dispatchEvent(
            new Event('pointerup', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onReset', async () => {
      await testNativeBubblingEvent({
        type: 'form',
        proxactEvent: 'onReset',
        proxactEventType: 'reset',
        nativeEvent: 'reset',
        dispatch(node) {
          const e = new Event('reset', {
            bubbles: true,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onSubmit', async () => {
      await testNativeBubblingEvent({
        type: 'form',
        proxactEvent: 'onSubmit',
        proxactEventType: 'submit',
        nativeEvent: 'submit',
        dispatch(node) {
          const e = new Event('submit', {
            bubbles: true,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onTouchCancel', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onTouchCancel',
        proxactEventType: 'touchcancel',
        nativeEvent: 'touchcancel',
        dispatch(node) {
          node.dispatchEvent(
            new Event('touchcancel', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onTouchEnd', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onTouchEnd',
        proxactEventType: 'touchend',
        nativeEvent: 'touchend',
        dispatch(node) {
          node.dispatchEvent(
            new Event('touchend', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onTouchMove', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onTouchMove',
        proxactEventType: 'touchmove',
        nativeEvent: 'touchmove',
        dispatch(node) {
          node.dispatchEvent(
            new Event('touchmove', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onTouchStart', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onTouchStart',
        proxactEventType: 'touchstart',
        nativeEvent: 'touchstart',
        dispatch(node) {
          node.dispatchEvent(
            new Event('touchstart', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });

    it('onTransitionRun', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onTransitionRun',
        proxactEventType: 'transitionrun',
        nativeEvent: 'transitionrun',
        dispatch(node) {
          node.dispatchEvent(
            new Event('transitionrun', {
              bubbles: true,
              cancelable: false,
            }),
          );
        },
      });
    });

    it('onTransitionStart', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onTransitionStart',
        proxactEventType: 'transitionstart',
        nativeEvent: 'transitionstart',
        dispatch(node) {
          node.dispatchEvent(
            new Event('transitionstart', {
              bubbles: true,
              cancelable: false,
            }),
          );
        },
      });
    });

    it('onTransitionCancel', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onTransitionCancel',
        proxactEventType: 'transitioncancel',
        nativeEvent: 'transitioncancel',
        dispatch(node) {
          node.dispatchEvent(
            new Event('transitioncancel', {
              bubbles: true,
              cancelable: false,
            }),
          );
        },
      });
    });

    it('onTransitionEnd', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onTransitionEnd',
        proxactEventType: 'transitionend',
        nativeEvent: 'transitionend',
        dispatch(node) {
          node.dispatchEvent(
            new Event('transitionend', {
              bubbles: true,
              cancelable: false,
            }),
          );
        },
      });
    });

    it('onWheel', async () => {
      await testNativeBubblingEvent({
        type: 'div',
        proxactEvent: 'onWheel',
        proxactEventType: 'wheel',
        nativeEvent: 'wheel',
        dispatch(node) {
          node.dispatchEvent(
            new Event('wheel', {
              bubbles: true,
              cancelable: true,
            }),
          );
        },
      });
    });
  });

  describe('non-bubbling events that bubble in React', () => {
    it('onAbort', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onAbort',
        proxactEventType: 'abort',
        nativeEvent: 'abort',
        dispatch(node) {
          const e = new Event('abort', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onCancel', async () => {
      await testEmulatedBubblingEvent({
        type: 'dialog',
        proxactEvent: 'onCancel',
        proxactEventType: 'cancel',
        nativeEvent: 'cancel',
        dispatch(node) {
          const e = new Event('cancel', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onCanPlay', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onCanPlay',
        proxactEventType: 'canplay',
        nativeEvent: 'canplay',
        dispatch(node) {
          const e = new Event('canplay', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onCanPlayThrough', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onCanPlayThrough',
        proxactEventType: 'canplaythrough',
        nativeEvent: 'canplaythrough',
        dispatch(node) {
          const e = new Event('canplaythrough', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onClose', async () => {
      await testEmulatedBubblingEvent({
        type: 'dialog',
        proxactEvent: 'onClose',
        proxactEventType: 'close',
        nativeEvent: 'close',
        dispatch(node) {
          const e = new Event('close', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onDurationChange', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onDurationChange',
        proxactEventType: 'durationchange',
        nativeEvent: 'durationchange',
        dispatch(node) {
          const e = new Event('durationchange', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onEmptied', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onEmptied',
        proxactEventType: 'emptied',
        nativeEvent: 'emptied',
        dispatch(node) {
          const e = new Event('emptied', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onEncrypted', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onEncrypted',
        proxactEventType: 'encrypted',
        nativeEvent: 'encrypted',
        dispatch(node) {
          const e = new Event('encrypted', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onEnded', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onEnded',
        proxactEventType: 'ended',
        nativeEvent: 'ended',
        dispatch(node) {
          const e = new Event('ended', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onError', async () => {
      await testEmulatedBubblingEvent({
        type: 'img',
        proxactEvent: 'onError',
        proxactEventType: 'error',
        nativeEvent: 'error',
        dispatch(node) {
          const e = new Event('error', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onInvalid', async () => {
      await testEmulatedBubblingEvent({
        type: 'input',
        proxactEvent: 'onInvalid',
        proxactEventType: 'invalid',
        nativeEvent: 'invalid',
        dispatch(node) {
          const e = new Event('invalid', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onLoad', async () => {
      await testEmulatedBubblingEvent({
        type: 'img',
        proxactEvent: 'onLoad',
        proxactEventType: 'load',
        nativeEvent: 'load',
        dispatch(node) {
          const e = new Event('load', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onLoadedData', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onLoadedData',
        proxactEventType: 'loadeddata',
        nativeEvent: 'loadeddata',
        dispatch(node) {
          const e = new Event('loadeddata', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onLoadedMetadata', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onLoadedMetadata',
        proxactEventType: 'loadedmetadata',
        nativeEvent: 'loadedmetadata',
        dispatch(node) {
          const e = new Event('loadedmetadata', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onLoadStart', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onLoadStart',
        proxactEventType: 'loadstart',
        nativeEvent: 'loadstart',
        dispatch(node) {
          const e = new Event('loadstart', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onPause', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onPause',
        proxactEventType: 'pause',
        nativeEvent: 'pause',
        dispatch(node) {
          const e = new Event('pause', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onPlay', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onPlay',
        proxactEventType: 'play',
        nativeEvent: 'play',
        dispatch(node) {
          const e = new Event('play', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onPlaying', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onPlaying',
        proxactEventType: 'playing',
        nativeEvent: 'playing',
        dispatch(node) {
          const e = new Event('playing', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onProgress', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onProgress',
        proxactEventType: 'progress',
        nativeEvent: 'progress',
        dispatch(node) {
          const e = new Event('progress', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onRateChange', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onRateChange',
        proxactEventType: 'ratechange',
        nativeEvent: 'ratechange',
        dispatch(node) {
          const e = new Event('ratechange', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onResize', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onResize',
        proxactEventType: 'resize',
        nativeEvent: 'resize',
        dispatch(node) {
          const e = new Event('resize', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onSeeked', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onSeeked',
        proxactEventType: 'seeked',
        nativeEvent: 'seeked',
        dispatch(node) {
          const e = new Event('seeked', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onSeeking', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onSeeking',
        proxactEventType: 'seeking',
        nativeEvent: 'seeking',
        dispatch(node) {
          const e = new Event('seeking', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onStalled', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onStalled',
        proxactEventType: 'stalled',
        nativeEvent: 'stalled',
        dispatch(node) {
          const e = new Event('stalled', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onSuspend', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onSuspend',
        proxactEventType: 'suspend',
        nativeEvent: 'suspend',
        dispatch(node) {
          const e = new Event('suspend', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onTimeUpdate', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onTimeUpdate',
        proxactEventType: 'timeupdate',
        nativeEvent: 'timeupdate',
        dispatch(node) {
          const e = new Event('timeupdate', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onToggle', async () => {
      await testEmulatedBubblingEvent({
        type: 'details',
        proxactEvent: 'onToggle',
        proxactEventType: 'toggle',
        nativeEvent: 'toggle',
        dispatch(node) {
          const e = new Event('toggle', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onBeforeToggle Popover API', async () => {
      await testEmulatedBubblingEvent({
        type: 'div',
        targetProps: {popover: 'any'},
        proxactEvent: 'onBeforeToggle',
        proxactEventType: 'beforetoggle',
        nativeEvent: 'beforetoggle',
        dispatch(node) {
          const e = new Event('beforetoggle', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onToggle Popover API', async () => {
      await testEmulatedBubblingEvent({
        type: 'div',
        targetProps: {popover: 'any'},
        proxactEvent: 'onToggle',
        proxactEventType: 'toggle',
        nativeEvent: 'toggle',
        dispatch(node) {
          const e = new Event('toggle', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onBeforeToggle Dialog API', async () => {
      await testEmulatedBubblingEvent({
        type: 'dialog',
        proxactEvent: 'onBeforeToggle',
        proxactEventType: 'beforetoggle',
        nativeEvent: 'beforetoggle',
        dispatch(node) {
          const e = new Event('beforetoggle', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onToggle Dialog API', async () => {
      await testEmulatedBubblingEvent({
        type: 'dialog',
        proxactEvent: 'onToggle',
        proxactEventType: 'toggle',
        nativeEvent: 'toggle',
        dispatch(node) {
          const e = new Event('toggle', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onVolumeChange', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onVolumeChange',
        proxactEventType: 'volumechange',
        nativeEvent: 'volumechange',
        dispatch(node) {
          const e = new Event('volumechange', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onWaiting', async () => {
      await testEmulatedBubblingEvent({
        type: 'video',
        proxactEvent: 'onWaiting',
        proxactEventType: 'waiting',
        nativeEvent: 'waiting',
        dispatch(node) {
          const e = new Event('waiting', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });
  });

  describe('non-bubbling events that do not bubble in React', () => {
    it('onScroll', async () => {
      await testNonBubblingEvent({
        type: 'div',
        proxactEvent: 'onScroll',
        proxactEventType: 'scroll',
        nativeEvent: 'scroll',
        dispatch(node) {
          const e = new Event('scroll', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });

    it('onScrollEnd', async () => {
      await testNonBubblingEvent({
        type: 'div',
        proxactEvent: 'onScrollEnd',
        proxactEventType: 'scrollend',
        nativeEvent: 'scrollend',
        dispatch(node) {
          const e = new Event('scrollend', {
            bubbles: false,
            cancelable: true,
          });
          node.dispatchEvent(e);
        },
      });
    });
  });

  // The tests for these events are currently very limited
  // because they are fully synthetic, and so they don't
  // work very well across different roots. For now, we'll
  // just document the current state in these tests.
  describe('enter/leave events', () => {
    it('onMouseEnter and onMouseLeave', async () => {
      const log = [];
      const targetRef = React.createRef();
      await render(
        <Fixture
          type="div"
          targetRef={targetRef}
          targetProps={{
            onMouseEnter: e => {
              log.push('---- inner enter');
            },
            onMouseLeave: e => {
              log.push('---- inner leave');
            },
          }}
          parentProps={{
            onMouseEnter: e => {
              log.push('--- inner parent enter');
            },
            onMouseLeave: e => {
              log.push('--- inner parent leave');
            },
          }}
          outerProps={{
            onMouseEnter: e => {
              log.push('-- outer enter');
            },
            onMouseLeave: e => {
              log.push('-- outer leave');
            },
          }}
          outerParentProps={{
            onMouseEnter: e => {
              log.push('- outer parent enter');
            },
            onMouseLeave: e => {
              log.push('- outer parent leave');
            },
          }}
        />,
      );
      expect(log.length).toBe(0);
      targetRef.current.dispatchEvent(
        new MouseEvent('mouseover', {
          bubbles: true,
          cancelable: true,
          relatedTarget: null,
        }),
      );
      // This order isn't ideal because each root
      // has a separate traversal.
      expect(log).toEqual(unindent`
        --- inner parent enter
        ---- inner enter
        - outer parent enter
        -- outer enter
      `);
      log.length = 0;
      targetRef.current.dispatchEvent(
        new MouseEvent('mouseout', {
          bubbles: true,
          cancelable: true,
          relatedTarget: document.body,
        }),
      );
      expect(log).toEqual(unindent`
        ---- inner leave
        --- inner parent leave
        -- outer leave
        - outer parent leave
      `);
    });

    it('onPointerEnter and onPointerLeave', async () => {
      const log = [];
      const targetRef = React.createRef();
      await render(
        <Fixture
          type="div"
          targetRef={targetRef}
          targetProps={{
            onPointerEnter: e => {
              log.push('---- inner enter');
            },
            onPointerLeave: e => {
              log.push('---- inner leave');
            },
          }}
          parentProps={{
            onPointerEnter: e => {
              log.push('--- inner parent enter');
            },
            onPointerLeave: e => {
              log.push('--- inner parent leave');
            },
          }}
          outerProps={{
            onPointerEnter: e => {
              log.push('-- outer enter');
            },
            onPointerLeave: e => {
              log.push('-- outer leave');
            },
          }}
          outerParentProps={{
            onPointerEnter: e => {
              log.push('- outer parent enter');
            },
            onPointerLeave: e => {
              log.push('- outer parent leave');
            },
          }}
        />,
      );
      expect(log.length).toBe(0);
      targetRef.current.dispatchEvent(
        new Event('pointerover', {
          bubbles: true,
          cancelable: true,
          relatedTarget: null,
        }),
      );
      // This order isn't ideal because each root
      // has a separate traversal.
      expect(log).toEqual(unindent`
        --- inner parent enter
        ---- inner enter
        - outer parent enter
        -- outer enter
      `);
      log.length = 0;
      targetRef.current.dispatchEvent(
        new Event('pointerout', {
          bubbles: true,
          cancelable: true,
          relatedTarget: document.body,
        }),
      );
      expect(log).toEqual(unindent`
        ---- inner leave
        --- inner parent leave
        -- outer leave
        - outer parent leave
      `);
    });
  });

  const setUntrackedValue = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value',
  ).set;

  // The tests for these events are currently very limited
  // because they are fully synthetic, and so they don't
  // work very well across different roots. For now, we'll
  // just document the current state in these tests.
  describe('polyfilled events', () => {
    it('onBeforeInput', async () => {
      const log = [];
      const targetRef = React.createRef();
      await render(
        <Fixture
          type="input"
          targetRef={targetRef}
          targetProps={{
            onBeforeInput: e => {
              log.push('---- inner');
            },
            onBeforeInputCapture: e => {
              log.push('---- inner capture');
            },
          }}
          parentProps={{
            onBeforeInput: e => {
              log.push('--- inner parent');
            },
            onBeforeInputCapture: e => {
              log.push('--- inner parent capture');
            },
          }}
          outerProps={{
            onBeforeInput: e => {
              log.push('-- outer');
            },
            onBeforeInputCapture: e => {
              log.push('-- outer capture');
            },
          }}
          outerParentProps={{
            onBeforeInput: e => {
              log.push('- outer parent');
            },
            onBeforeInputCapture: e => {
              expect(e.type).toBe('beforeinput');
              log.push('- outer parent capture');
            },
          }}
        />,
      );
      expect(log.length).toBe(0);
      const e = new Event('textInput', {
        bubbles: true,
      });
      e.data = 'abcd';
      targetRef.current.dispatchEvent(e);
      // Since this is a polyfilled event,
      // the capture and bubble phases are
      // emulated, and don't align between roots.
      expect(log).toEqual(unindent`
        --- inner parent capture
        ---- inner capture
        ---- inner
        --- inner parent
        - outer parent capture
        -- outer capture
        -- outer
        - outer parent
      `);
    });

    it('onChange', async () => {
      const log = [];
      const targetRef = React.createRef();
      await render(
        <Fixture
          type="input"
          targetRef={targetRef}
          targetProps={{
            onChange: e => {
              log.push('---- inner');
            },
            onChangeCapture: e => {
              log.push('---- inner capture');
            },
          }}
          parentProps={{
            onChange: e => {
              log.push('--- inner parent');
            },
            onChangeCapture: e => {
              log.push('--- inner parent capture');
            },
          }}
          outerProps={{
            onChange: e => {
              log.push('-- outer');
            },
            onChangeCapture: e => {
              log.push('-- outer capture');
            },
          }}
          outerParentProps={{
            onChange: e => {
              log.push('- outer parent');
            },
            onChangeCapture: e => {
              expect(e.type).toBe('change');
              log.push('- outer parent capture');
            },
          }}
        />,
      );
      expect(log.length).toBe(0);
      setUntrackedValue.call(targetRef.current, 'hello');
      targetRef.current.dispatchEvent(
        new Event('input', {
          bubbles: true,
        }),
      );
      // The outer React doesn't receive the event at all
      // because it is not responsible for this input.
      expect(log).toEqual(unindent`
        --- inner parent capture
        ---- inner capture
        ---- inner
        --- inner parent
      `);
    });

    it('onCompositionStart', async () => {
      const log = [];
      const targetRef = React.createRef();
      await render(
        <Fixture
          type="input"
          targetRef={targetRef}
          targetProps={{
            onCompositionStart: e => {
              log.push('---- inner');
            },
            onCompositionStartCapture: e => {
              log.push('---- inner capture');
            },
          }}
          parentProps={{
            onCompositionStart: e => {
              log.push('--- inner parent');
            },
            onCompositionStartCapture: e => {
              log.push('--- inner parent capture');
            },
          }}
          outerProps={{
            onCompositionStart: e => {
              log.push('-- outer');
            },
            onCompositionStartCapture: e => {
              log.push('-- outer capture');
            },
          }}
          outerParentProps={{
            onCompositionStart: e => {
              log.push('- outer parent');
            },
            onCompositionStartCapture: e => {
              expect(e.type).toBe('compositionstart');
              log.push('- outer parent capture');
            },
          }}
        />,
      );
      expect(log.length).toBe(0);
      const e = new Event('compositionstart', {
        bubbles: true,
      });
      targetRef.current.dispatchEvent(e);
      // Since this is a polyfilled event,
      // the capture and bubble phases are
      // emulated, and don't align between roots.
      expect(log).toEqual(unindent`
        --- inner parent capture
        ---- inner capture
        ---- inner
        --- inner parent
        - outer parent capture
        -- outer capture
        -- outer
        - outer parent
      `);
    });

    it('onCompositionEnd', async () => {
      const log = [];
      const targetRef = React.createRef();
      await render(
        <Fixture
          type="input"
          targetRef={targetRef}
          targetProps={{
            onCompositionEnd: e => {
              log.push('---- inner');
            },
            onCompositionEndCapture: e => {
              log.push('---- inner capture');
            },
          }}
          parentProps={{
            onCompositionEnd: e => {
              log.push('--- inner parent');
            },
            onCompositionEndCapture: e => {
              log.push('--- inner parent capture');
            },
          }}
          outerProps={{
            onCompositionEnd: e => {
              log.push('-- outer');
            },
            onCompositionEndCapture: e => {
              log.push('-- outer capture');
            },
          }}
          outerParentProps={{
            onCompositionEnd: e => {
              log.push('- outer parent');
            },
            onCompositionEndCapture: e => {
              expect(e.type).toBe('compositionend');
              log.push('- outer parent capture');
            },
          }}
        />,
      );
      expect(log.length).toBe(0);
      const e = new Event('compositionend', {
        bubbles: true,
      });
      targetRef.current.dispatchEvent(e);
      // Since this is a polyfilled event,
      // the capture and bubble phases are
      // emulated, and don't align between roots.
      expect(log).toEqual(unindent`
        --- inner parent capture
        ---- inner capture
        ---- inner
        --- inner parent
        - outer parent capture
        -- outer capture
        -- outer
        - outer parent
      `);
    });

    it('onCompositionUpdate', async () => {
      const log = [];
      const targetRef = React.createRef();
      await render(
        <Fixture
          type="input"
          targetRef={targetRef}
          targetProps={{
            onCompositionUpdate: e => {
              log.push('---- inner');
            },
            onCompositionUpdateCapture: e => {
              log.push('---- inner capture');
            },
          }}
          parentProps={{
            onCompositionUpdate: e => {
              log.push('--- inner parent');
            },
            onCompositionUpdateCapture: e => {
              log.push('--- inner parent capture');
            },
          }}
          outerProps={{
            onCompositionUpdate: e => {
              log.push('-- outer');
            },
            onCompositionUpdateCapture: e => {
              log.push('-- outer capture');
            },
          }}
          outerParentProps={{
            onCompositionUpdate: e => {
              log.push('- outer parent');
            },
            onCompositionUpdateCapture: e => {
              expect(e.type).toBe('compositionupdate');
              log.push('- outer parent capture');
            },
          }}
        />,
      );
      expect(log.length).toBe(0);
      const e = new Event('compositionupdate', {
        bubbles: true,
      });
      targetRef.current.dispatchEvent(e);
      // Since this is a polyfilled event,
      // the capture and bubble phases are
      // emulated, and don't align between roots.
      expect(log).toEqual(unindent`
        --- inner parent capture
        ---- inner capture
        ---- inner
        --- inner parent
        - outer parent capture
        -- outer capture
        -- outer
        - outer parent
      `);
    });

    it('onSelect', async () => {
      const log = [];
      const targetRef = React.createRef();
      await render(
        <Fixture
          type="input"
          targetRef={targetRef}
          targetProps={{
            onSelect: e => {
              log.push('---- inner');
            },
            onSelectCapture: e => {
              log.push('---- inner capture');
            },
          }}
          parentProps={{
            onSelect: e => {
              log.push('--- inner parent');
            },
            onSelectCapture: e => {
              log.push('--- inner parent capture');
            },
          }}
          outerProps={{
            onSelect: e => {
              log.push('-- outer');
            },
            onSelectCapture: e => {
              log.push('-- outer capture');
            },
          }}
          outerParentProps={{
            onSelect: e => {
              log.push('- outer parent');
            },
            onSelectCapture: e => {
              expect(e.type).toBe('select');
              log.push('- outer parent capture');
            },
          }}
        />,
      );
      expect(log.length).toBe(0);
      targetRef.current.focus();
      targetRef.current.dispatchEvent(
        new Event('keydown', {
          bubbles: true,
        }),
      );
      // The outer React doesn't receive the event at all
      // because it is not responsible for this input.
      expect(log).toEqual(unindent`
        --- inner parent capture
        ---- inner capture
        ---- inner
        --- inner parent
      `);
    });
  });

  // Events that bubble in React and in the browser.
  // React delegates them to the root.
  async function testNativeBubblingEvent(config) {
    await testNativeBubblingEventWithTargetListener(config);
    await testNativeBubblingEventWithoutTargetListener(config);
    await testReactStopPropagationInOuterCapturePhase(config);
    await testReactStopPropagationInInnerCapturePhase(config);
    await testReactStopPropagationInInnerBubblePhase(config);
    await testReactStopPropagationInOuterBubblePhase(config);
    await testNativeStopPropagationInOuterCapturePhase(config);
    await testNativeStopPropagationInInnerCapturePhase(config);
    await testNativeStopPropagationInInnerBubblePhase(config);
    await testNativeStopPropagationInOuterBubblePhase(config);
  }

  // Events that bubble in React but not in the browser.
  // React attaches them to the elements.
  async function testEmulatedBubblingEvent(config) {
    await testEmulatedBubblingEventWithTargetListener(config);
    await testEmulatedBubblingEventWithoutTargetListener(config);
    await testReactStopPropagationInOuterCapturePhase(config);
    await testReactStopPropagationInInnerCapturePhase(config);
    await testReactStopPropagationInInnerBubblePhase(config);
    await testNativeStopPropagationInOuterCapturePhase(config);
    await testNativeStopPropagationInInnerCapturePhase(config);
    await testNativeStopPropagationInInnerEmulatedBubblePhase(config);
  }

  // Events that don't bubble either in React or in the browser.
  async function testNonBubblingEvent(config) {
    await testNonBubblingEventWithTargetListener(config);
    await testNonBubblingEventWithoutTargetListener(config);
    await testReactStopPropagationInOuterCapturePhase(config);
    await testReactStopPropagationInInnerCapturePhase(config);
    await testReactStopPropagationInInnerBubblePhase(config);
    await testNativeStopPropagationInOuterCapturePhase(config);
    await testNativeStopPropagationInInnerCapturePhase(config);
  }

  async function testNativeBubblingEventWithTargetListener(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // Should print all listeners.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      ---- inner
      --- inner parent
      -- outer
      - outer parent
    `);
  }

  async function testEmulatedBubblingEventWithTargetListener(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          ...eventConfig.targetProps,
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // This event doesn't bubble natively, but React emulates it.
    // Since the element is created by the inner React, the bubbling
    // stops at the inner parent and never reaches the outer React.
    // In the future, we might consider not bubbling these events
    // at all, in which case inner parent also wouldn't be logged.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      ---- inner
      --- inner parent
    `);
  }

  async function testNonBubblingEventWithTargetListener(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // This event doesn't bubble natively, and React is
    // not emulating it either. So it only reaches the
    // target and stops there.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      ---- inner
    `);
  }

  async function testNativeBubblingEventWithoutTargetListener(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={
          {
            // No listener on the target itself.
          }
        }
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // Should print all listeners except the innermost one.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      --- inner parent
      -- outer
      - outer parent
    `);
  }

  async function testEmulatedBubblingEventWithoutTargetListener(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          ...eventConfig.targetProps,
          // No listener on the target itself.
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // This event doesn't bubble natively, but React emulates it.
    // Since the element is created by the inner React, the bubbling
    // stops at the inner parent and never reaches the outer React.
    // In the future, we might consider not bubbling these events
    // at all, in which case inner parent also wouldn't be logged.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      --- inner parent
    `);
  }

  async function testNonBubblingEventWithoutTargetListener(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={
          {
            // No listener on the target itself.
          }
        }
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // This event doesn't bubble native, and React doesn't
    // emulate bubbling either. Since we don't have a target
    // listener, only capture phase listeners fire.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
    `);
  }

  async function testReactStopPropagationInOuterCapturePhase(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={node => {
          targetRef.current = node;
          if (node) {
            // No cleanup, assume we render once.
            node.addEventListener(eventConfig.nativeEvent, e => {
              // We *don't* expect this to appear in the log
              // at all because the event is stopped earlier.
              log.push('---- inner (native)');
            });
          }
        }}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            e.stopPropagation(); // <---------
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // Should stop at the outer capture.
    // We don't get to the inner root at all.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
    `);
  }

  async function testReactStopPropagationInInnerCapturePhase(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={node => {
          targetRef.current = node;
          if (node) {
            // No cleanup, assume we render once.
            node.addEventListener(eventConfig.nativeEvent, e => {
              // We *don't* expect this to appear in the log
              // at all because the event is stopped earlier.
              log.push('---- inner (native)');
            });
          }
        }}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            e.stopPropagation(); // <---------
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // We get to the inner root, but we don't
    // get to the target and we don't bubble.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
    `);
  }

  async function testReactStopPropagationInInnerBubblePhase(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          ...eventConfig.targetProps,
          [eventConfig.proxactEvent]: e => {
            e.stopPropagation(); // <---------
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerRef={node => {
          if (node) {
            // No cleanup, assume we render once.
            node.addEventListener(eventConfig.nativeEvent, e => {
              // We *don't* expect this to appear in the log
              // at all because the event is stopped earlier.
              log.push('-- outer (native)');
            });
          }
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // Should stop at the target and not go further.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      ---- inner
    `);
  }

  async function testReactStopPropagationInOuterBubblePhase(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            e.stopPropagation(); // <---------
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // Should not reach the parent outer bubble handler.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      ---- inner
      --- inner parent
      -- outer
    `);
  }

  async function testNativeStopPropagationInOuterCapturePhase(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentRef={node => {
          if (node) {
            // No cleanup, assume we render once.
            node.addEventListener(
              eventConfig.nativeEvent,
              e => {
                log.push('- outer parent capture (native)');
                e.stopPropagation(); // <---------
              },
              {capture: true},
            );
          }
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // The outer root has already received the event,
    // so the capture phrase runs for it. But the inner
    // root is prevented from receiving it by the native
    // handler in the outer native capture phase.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      - outer parent capture (native)
    `);
  }

  async function testNativeStopPropagationInInnerCapturePhase(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentRef={node => {
          if (node) {
            // No cleanup, assume we render once.
            node.addEventListener(
              eventConfig.nativeEvent,
              e => {
                log.push('--- inner parent capture (native)');
                e.stopPropagation(); // <---------
              },
              {capture: true},
            );
          }
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // The inner root has already received the event, so
    // all React capture phase listeners should run.
    // But then the native handler stops propagation
    // so none of the bubbling React handlers would run.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      --- inner parent capture (native)
    `);
  }

  async function testNativeStopPropagationInInnerBubblePhase(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={node => {
          targetRef.current = node;
          if (node) {
            // No cleanup, assume we render once.
            node.addEventListener(eventConfig.nativeEvent, e => {
              log.push('---- inner (native)');
              e.stopPropagation(); // <---------
            });
          }
        }}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // The capture phase is entirely unaffected.
    // Then, we get into the bubble phase.
    // We start with the native innermost handler.
    // It stops propagation, so nothing else happens.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      ---- inner (native)
    `);
  }

  async function testNativeStopPropagationInInnerEmulatedBubblePhase(
    eventConfig,
  ) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={node => {
          targetRef.current = node;
          if (node) {
            // No cleanup, assume we render once.
            node.addEventListener(eventConfig.nativeEvent, e => {
              log.push('---- inner (native)');
              e.stopPropagation(); // <---------
            });
          }
        }}
        targetProps={{
          ...eventConfig.targetProps,
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // This event does not natively bubble, so React
    // attaches the listener directly to the element.
    // As a result, by the time our custom native listener
    // fires, it is too late to do anything -- the React
    // emulated bubbilng has already happened.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      ---- inner
      --- inner parent
      ---- inner (native)
    `);
  }

  async function testNativeStopPropagationInOuterBubblePhase(eventConfig) {
    const log = [];
    const targetRef = React.createRef();
    await render(
      <Fixture
        type={eventConfig.type}
        targetRef={targetRef}
        targetProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('---- inner');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('---- inner capture');
          },
        }}
        parentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('--- inner parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('--- inner parent capture');
          },
        }}
        outerRef={node => {
          if (node) {
            // No cleanup, assume we render once.
            node.addEventListener(eventConfig.nativeEvent, e => {
              log.push('-- outer (native)');
              e.stopPropagation(); // <---------
            });
          }
        }}
        outerProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('-- outer');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            log.push('-- outer capture');
          },
        }}
        outerParentProps={{
          [eventConfig.proxactEvent]: e => {
            log.push('- outer parent');
          },
          [eventConfig.proxactEvent + 'Capture']: e => {
            expect(e.type).toBe(eventConfig.proxactEventType);
            log.push('- outer parent capture');
          },
        }}
      />,
    );
    expect(log.length).toBe(0);
    eventConfig.dispatch(targetRef.current);
    // The event bubbles upwards through the inner tree.
    // Then it reaches the native handler which stops propagation.
    // As a result, it never reaches the outer React root,
    // and thus the outer React event handlers don't fire.
    expect(log).toEqual(unindent`
      - outer parent capture
      -- outer capture
      --- inner parent capture
      ---- inner capture
      ---- inner
      --- inner parent
      -- outer (native)
    `);
  }

  function Fixture({
    type,
    targetRef,
    targetProps,
    parentRef,
    parentProps,
    outerRef,
    outerProps,
    outerParentRef,
    outerParentProps,
  }) {
    const inner = React.useMemo(
      () => (
        <Inner
          type={type}
          targetRef={targetRef}
          targetProps={targetProps}
          parentRef={parentRef}
          parentProps={parentProps}
        />
      ),
      [type, targetRef, targetProps, parentProps],
    );
    return (
      <Outer
        outerRef={outerRef}
        outerProps={outerProps}
        outerParentRef={outerParentRef}
        outerParentProps={outerParentProps}>
        <NestedReact>{inner}</NestedReact>
      </Outer>
    );
  }

  function NestedReact({children}) {
    const ref = React.useRef();
    React.useLayoutEffect(() => {
      const parent = ref.current;
      const innerContainer = document.createElement('div');
      parent.appendChild(innerContainer);
      const innerReactRoot = InnerReactDOMClient.createRoot(innerContainer);
      InnerReactDOM.flushSync(() => {
        innerReactRoot.render(children);
      });
      return () => {
        innerReactRoot.unmount();
        parent.removeChild(innerContainer);
      };
    }, [children, ref]);
    return <div ref={ref} />;
  }

  function Inner({type, targetRef, targetProps, parentRef, parentProps}) {
    const T = type;
    return (
      <div {...parentProps} ref={parentRef}>
        <T {...targetProps} ref={targetRef} />
      </div>
    );
  }

  function Outer({
    outerRef,
    outerProps,
    outerParentProps,
    outerParentRef,
    children,
  }) {
    return (
      <div {...outerParentProps} ref={outerParentRef}>
        <div {...outerProps} ref={outerRef}>
          {children}
        </div>
      </div>
    );
  }

  function unindent(str) {
    return str[0]
      .split('\n')
      .map(s => s.trim())
      .filter(s => s !== '');
  }
});
