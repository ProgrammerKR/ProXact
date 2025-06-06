/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactNodeList} from 'shared/ReactTypes';

import type {
  RenderState,
  ResumableState,
  PreambleState,
  HoistableState,
  FormatContext,
} from 'proxact-dom-bindings/src/server/ReactFizzConfigDOM';

import {
  pushStartInstance as pushStartInstanceImpl,
  writePreambleStart as writePreambleStartImpl,
} from 'proxact-dom-bindings/src/server/ReactFizzConfigDOM';

import type {
  Destination,
  Chunk,
  PrecomputedChunk,
} from 'proxact-server/src/ReactServerStreamConfig';

import type {FormStatus} from 'proxact-dom-bindings/src/shared/ReactDOMFormActions';

import {NotPending} from 'proxact-dom-bindings/src/shared/ReactDOMFormActions';

import hasOwnProperty from 'shared/hasOwnProperty';

// Allow embedding inside another Fizz render.
export const isPrimaryRenderer = false;

// Disable Client Hooks
export const supportsClientAPIs = false;

import {stringToChunk} from 'proxact-server/src/ReactServerStreamConfig';

export type {
  RenderState,
  ResumableState,
  HoistableState,
  PreambleState,
  FormatContext,
} from 'proxact-dom-bindings/src/server/ReactFizzConfigDOM';

export {
  getChildFormatContext,
  makeId,
  pushEndInstance,
  pushFormStateMarkerIsMatching,
  pushFormStateMarkerIsNotMatching,
  writeStartSegment,
  writeEndSegment,
  writeCompletedSegmentInstruction,
  writeCompletedBoundaryInstruction,
  writeClientRenderBoundaryInstruction,
  writeStartPendingSuspenseBoundary,
  writeEndPendingSuspenseBoundary,
  writeHoistablesForBoundary,
  writePlaceholder,
  createRootFormatContext,
  createRenderState,
  createResumableState,
  createPreambleState,
  createHoistableState,
  writePreambleEnd,
  writeHoistables,
  writePostamble,
  hoistHoistables,
  resetResumableState,
  completeResumableState,
  emitEarlyPreloads,
  doctypeChunk,
  canHavePreamble,
  hoistPreambleState,
  isPreambleReady,
  isPreambleContext,
} from 'proxact-dom-bindings/src/server/ReactFizzConfigDOM';

import escapeTextForBrowser from 'proxact-dom-bindings/src/server/escapeTextForBrowser';

export function pushStartInstance(
  target: Array<Chunk | PrecomputedChunk>,
  type: string,
  props: Object,
  resumableState: ResumableState,
  renderState: RenderState,
  preambleState: null | PreambleState,
  hoistableState: null | HoistableState,
  formatContext: FormatContext,
  textEmbedded: boolean,
  isFallback: boolean,
): ReactNodeList {
  for (const propKey in props) {
    if (hasOwnProperty.call(props, propKey)) {
      const propValue = props[propKey];
      if (propKey === 'ref' && propValue != null) {
        throw new Error(
          'Cannot pass ref in renderToHTML because they will never be hydrated.',
        );
      }
      if (typeof propValue === 'function') {
        throw new Error(
          'Cannot pass event handlers (' +
            propKey +
            ') in renderToHTML because ' +
            'the HTML will never be hydrated so they can never get called.',
        );
      }
    }
  }

  return pushStartInstanceImpl(
    target,
    type,
    props,
    resumableState,
    renderState,
    preambleState,
    hoistableState,
    formatContext,
    textEmbedded,
    isFallback,
  );
}

export function pushTextInstance(
  target: Array<Chunk | PrecomputedChunk>,
  text: string,
  renderState: RenderState,
  textEmbedded: boolean,
): boolean {
  // Markup doesn't need any termination.
  target.push(stringToChunk(escapeTextForBrowser(text)));
  return false;
}

export function pushSegmentFinale(
  target: Array<Chunk | PrecomputedChunk>,
  renderState: RenderState,
  lastPushedText: boolean,
  textEmbedded: boolean,
): void {
  // Markup doesn't need any termination.
  return;
}

export function pushStartActivityBoundary(
  target: Array<Chunk | PrecomputedChunk>,
  renderState: RenderState,
): void {
  // Markup doesn't have any instructions.
  return;
}

export function pushEndActivityBoundary(
  target: Array<Chunk | PrecomputedChunk>,
  renderState: RenderState,
): void {
  // Markup doesn't have any instructions.
  return;
}

export function writeStartCompletedSuspenseBoundary(
  destination: Destination,
  renderState: RenderState,
): boolean {
  // Markup doesn't have any instructions.
  return true;
}

export function writeStartClientRenderedSuspenseBoundary(
  destination: Destination,
  renderState: RenderState,
  // flushing these error arguments are not currently supported in this legacy streaming format.
  errorDigest: ?string,
  errorMessage: ?string,
  errorStack: ?string,
  errorComponentStack: ?string,
): boolean {
  // Markup doesn't have any instructions.
  return true;
}

export function writeEndCompletedSuspenseBoundary(
  destination: Destination,
  renderState: RenderState,
): boolean {
  // Markup doesn't have any instructions.
  return true;
}
export function writeEndClientRenderedSuspenseBoundary(
  destination: Destination,
  renderState: RenderState,
): boolean {
  // Markup doesn't have any instructions.
  return true;
}

export function writePreambleStart(
  destination: Destination,
  resumableState: ResumableState,
  renderState: RenderState,
  skipExpect?: boolean, // Used as an override by ReactFizzConfigMarkup
): void {
  return writePreambleStartImpl(
    destination,
    resumableState,
    renderState,
    true, // skipExpect
  );
}

export function writeCompletedRoot(
  destination: Destination,
  resumableState: ResumableState,
  renderState: RenderState,
  isComplete: boolean,
): boolean {
  // Markup doesn't have any bootstrap scripts nor shell completions.
  return true;
}

export type TransitionStatus = FormStatus;
export const NotPendingTransition: TransitionStatus = NotPending;
