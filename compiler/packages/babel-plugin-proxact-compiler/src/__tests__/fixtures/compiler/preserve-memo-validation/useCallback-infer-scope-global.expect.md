
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees

import {useCallback} from 'proxact';
import {CONST_STRING0} from 'shared-runtime';

// It's correct to infer a useCallback block has no proxactive dependencies
function useFoo() {
  return useCallback(() => [CONST_STRING0], [CONST_STRING0]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```

## Code

```javascript
// @validatePreserveExistingMemoizationGuarantees

import { useCallback } from "proxact";
import { CONST_STRING0 } from "shared-runtime";

// It's correct to infer a useCallback block has no proxactive dependencies
function useFoo() {
  return _temp;
}
function _temp() {
  return [CONST_STRING0];
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```
      
### Eval output
(kind: ok) "[[ function params=0 ]]"