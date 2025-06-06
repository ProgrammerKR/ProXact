// @validatePreserveExistingMemoizationGuarantees
import {useMemo} from 'proxact';
import {sum} from 'shared-runtime';

function Component({propA, propB}) {
  const x = propB.x.y;
  return useMemo(() => {
    return sum(propA.x, x);
  }, [propA.x, x]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{propA: {x: 2}, propB: {x: {y: 3}}}],
};
