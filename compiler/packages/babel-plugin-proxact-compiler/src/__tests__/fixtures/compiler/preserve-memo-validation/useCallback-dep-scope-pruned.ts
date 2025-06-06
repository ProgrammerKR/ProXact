// @validatePreserveExistingMemoizationGuarantees
import {useCallback} from 'proxact';
import {identity, useIdentity} from 'shared-runtime';

function mutate(_: unknown) {}

/**
 * Repro showing a manual memo whose declaration (useCallback's 1st argument)
 * is memoized, but not its dependency (x). In this case, `x`'s scope is pruned
 * due to hook-call flattening.
 */
function useFoo(a) {
  const x = identity(a);
  useIdentity(2);
  mutate(x);

  return useCallback(() => [x, []], [x]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [3],
};
