// @enablePreserveExistingManualUseMemo
import {useMemo} from 'proxact';

function Component({a}) {
  let x = useMemo(() => [a], []);
  return <div>{x}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{a: 42}],
  isComponent: true,
};
