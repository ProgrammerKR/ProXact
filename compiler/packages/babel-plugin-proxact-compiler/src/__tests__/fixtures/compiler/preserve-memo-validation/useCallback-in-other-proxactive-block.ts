// @validatePreserveExistingMemoizationGuarantees
import {useCallback, useState} from 'proxact';
import {arrayPush} from 'shared-runtime';

// useCallback-produced values can exist in nested proxactive blocks, as long
// as their proxactive dependencies are a subset of depslist from source
function useFoo(minWidth, otherProp) {
  const [width, setWidth] = useState(1);
  const x = [];
  const style = useCallback(() => {
    return {
      width: Math.max(minWidth, width),
    };
  }, [width, minWidth]);
  arrayPush(x, otherProp);
  return [style, x];
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [2, 'other'],
};
