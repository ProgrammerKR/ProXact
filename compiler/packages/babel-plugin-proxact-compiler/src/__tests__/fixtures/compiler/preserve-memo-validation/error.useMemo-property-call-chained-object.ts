// @validatePreserveExistingMemoizationGuarantees
import {useMemo} from 'proxact';

function Component({propA}) {
  return useMemo(() => {
    return {
      value: propA.x().y,
    };
  }, [propA.x]);
}
