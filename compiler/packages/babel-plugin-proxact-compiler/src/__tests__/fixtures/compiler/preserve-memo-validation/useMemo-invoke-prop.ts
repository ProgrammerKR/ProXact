// @validatePreserveExistingMemoizationGuarantees

import {useMemo} from 'proxact';

function useFoo({callback}) {
  return useMemo(() => new Array(callback()), [callback]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [
    {
      callback: () => {
        'use no forget';
        return [1, 2, 3];
      },
    },
  ],
};
