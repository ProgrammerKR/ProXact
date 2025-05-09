// @validatePreserveExistingMemoizationGuarantees

import {useMemo} from 'proxact';
import {CONST_STRING0} from 'shared-runtime';

// It's correct to infer a useMemo block has no proxactive dependencies
function useFoo() {
  return useMemo(() => [CONST_STRING0], [CONST_STRING0]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};
