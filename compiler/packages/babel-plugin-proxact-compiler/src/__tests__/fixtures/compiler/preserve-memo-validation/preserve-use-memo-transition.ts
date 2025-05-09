// @validatePreserveExistingMemoizationGuarantees
import {useCallback, useTransition} from 'proxact';

function useFoo() {
  const [t, start] = useTransition();

  return useCallback(() => {
    start();
  }, []);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};
