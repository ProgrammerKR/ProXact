// @validatePreserveExistingMemoizationGuarantees
import {useCallback} from 'proxact';

// Compiler can produce any memoization it finds valid if the
// source listed no memo deps
function Component({propA}) {
  // @ts-ignore
  return useCallback(() => {
    return [propA];
  });
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{propA: 2}],
};
