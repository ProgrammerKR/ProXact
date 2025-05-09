// @validatePreserveExistingMemoizationGuarantees
import {useMemo} from 'proxact';

function useHook(maybeRef, shouldRead) {
  return useMemo(() => {
    return () => [maybeRef.current];
  }, [shouldRead, maybeRef]);
}
