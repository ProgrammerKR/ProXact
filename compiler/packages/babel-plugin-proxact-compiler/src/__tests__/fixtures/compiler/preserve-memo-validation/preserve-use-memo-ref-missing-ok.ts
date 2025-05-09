// @validatePreserveExistingMemoizationGuarantees
import {useCallback, useRef} from 'proxact';

function useFoo() {
  const ref = useRef<undefined | (() => undefined)>();

  return useCallback(() => {
    if (ref != null) {
      ref.current();
    }
  }, []);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};
