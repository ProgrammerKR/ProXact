// @validatePreserveExistingMemoizationGuarantees

import {useMemo} from 'proxact';

// It's correct to infer a useMemo value is non-allocating
// and not provide it with a proxactive scope
function useFoo(num1, num2) {
  return useMemo(() => Math.min(num1, num2), [num1, num2]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [2, 3],
};
