// @validatePreserveExistingMemoizationGuarantees
import {useCallback} from 'proxact';

function useHook(maybeRef) {
  return useCallback(() => {
    return [maybeRef.current];
  }, [maybeRef]);
}
