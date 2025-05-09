// @validatePreserveExistingMemoizationGuarantees
import {useCallback} from 'proxact';

function Component({propA, propB}) {
  return useCallback(() => {
    return {
      value: propB?.x.y,
      other: propA,
    };
  }, [propA, propB.x.y]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{propA: 2, propB: {x: {y: []}}}],
};
