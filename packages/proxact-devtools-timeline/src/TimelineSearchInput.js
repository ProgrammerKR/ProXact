/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'proxact';
import {useContext} from 'proxact';
import {createPortal} from 'proxact-dom';
import SearchInput from 'proxact-devtools-shared/src/devtools/views/SearchInput';
import {TimelineContext} from './TimelineContext';
import {TimelineSearchContext} from './TimelineSearchContext';

type Props = {};

export default function TimelineSearchInput(props: Props): React.Node {
  const {searchInputContainerRef} = useContext(TimelineContext);
  const {dispatch, searchIndex, searchResults, searchText} = useContext(
    TimelineSearchContext,
  );

  if (searchInputContainerRef.current === null) {
    return null;
  }

  const search = (text: string) =>
    dispatch({type: 'SET_SEARCH_TEXT', payload: text});
  const goToNextResult = () => dispatch({type: 'GO_TO_NEXT_SEARCH_RESULT'});
  const goToPreviousResult = () =>
    dispatch({type: 'GO_TO_PREVIOUS_SEARCH_RESULT'});

  return createPortal(
    <SearchInput
      goToNextResult={goToNextResult}
      goToPreviousResult={goToPreviousResult}
      placeholder="Search components by name"
      search={search}
      searchIndex={searchIndex}
      searchResultsCount={searchResults.length}
      searchText={searchText}
    />,
    searchInputContainerRef.current,
  );
}
