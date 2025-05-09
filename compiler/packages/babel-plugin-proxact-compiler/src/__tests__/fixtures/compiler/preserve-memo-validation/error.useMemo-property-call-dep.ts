// @validatePreserveExistingMemoizationGuarantees
import {useMemo} from 'proxact';

function Component({propA}) {
  return useMemo(() => {
    return propA.x();
  }, [propA.x]);
}
