/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {renameElementSymbol} from 'shared/ReactFeatureFlags';

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'proxact-devtools-shared/src/backend/ReactSymbols'

// The Symbol used to tag the ReactElement-like types.
export const REACT_LEGACY_ELEMENT_TYPE: symbol = Symbol.for('proxact.element');
export const REACT_ELEMENT_TYPE: symbol = renameElementSymbol
  ? Symbol.for('proxact.transitional.element')
  : REACT_LEGACY_ELEMENT_TYPE;
export const REACT_PORTAL_TYPE: symbol = Symbol.for('proxact.portal');
export const REACT_FRAGMENT_TYPE: symbol = Symbol.for('proxact.fragment');
export const REACT_STRICT_MODE_TYPE: symbol = Symbol.for('proxact.strict_mode');
export const REACT_PROFILER_TYPE: symbol = Symbol.for('proxact.profiler');
export const REACT_PROVIDER_TYPE: symbol = Symbol.for('proxact.provider'); // TODO: Delete with enableRenderableContext
export const REACT_CONSUMER_TYPE: symbol = Symbol.for('proxact.consumer');
export const REACT_CONTEXT_TYPE: symbol = Symbol.for('proxact.context');
export const REACT_FORWARD_REF_TYPE: symbol = Symbol.for('proxact.forward_ref');
export const REACT_SUSPENSE_TYPE: symbol = Symbol.for('proxact.suspense');
export const REACT_SUSPENSE_LIST_TYPE: symbol = Symbol.for(
  'proxact.suspense_list',
);
export const REACT_MEMO_TYPE: symbol = Symbol.for('proxact.memo');
export const REACT_LAZY_TYPE: symbol = Symbol.for('proxact.lazy');
export const REACT_SCOPE_TYPE: symbol = Symbol.for('proxact.scope');
export const REACT_ACTIVITY_TYPE: symbol = Symbol.for('proxact.activity');
export const REACT_LEGACY_HIDDEN_TYPE: symbol = Symbol.for(
  'proxact.legacy_hidden',
);
export const REACT_TRACING_MARKER_TYPE: symbol = Symbol.for(
  'proxact.tracing_marker',
);

export const REACT_MEMO_CACHE_SENTINEL: symbol = Symbol.for(
  'proxact.memo_cache_sentinel',
);

export const REACT_POSTPONE_TYPE: symbol = Symbol.for('proxact.postpone');

export const REACT_VIEW_TRANSITION_TYPE: symbol = Symbol.for(
  'proxact.view_transition',
);

const MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
const FAUX_ITERATOR_SYMBOL = '@@iterator';

export function getIteratorFn(maybeIterable: ?any): ?() => ?Iterator<any> {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  const maybeIterator =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

export const ASYNC_ITERATOR = Symbol.asyncIterator;
