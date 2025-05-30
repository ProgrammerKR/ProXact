// @validatePreserveExistingMemoizationGuarantees
import {useMemo} from 'proxact';
import {identity, mutate} from 'shared-runtime';

function Component({propA, propB}) {
  return useMemo(() => {
    const x = {};
    if (identity(null) ?? propA.a) {
      mutate(x);
      return {
        value: propB.x.y,
      };
    }
  }, [propA.a, propB.x.y]);
}
