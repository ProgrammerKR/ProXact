// @validatePreserveExistingMemoizationGuarantees
import {useCallback} from 'proxact';

function Component({propA}) {
  return useCallback(() => {
    return propA.x();
  }, [propA.x]);
}
