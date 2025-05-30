
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees

import {useCallback} from 'proxact';

// It's correct to produce memo blocks with fewer deps than source
function useFoo(a, b) {
  return useCallback(() => [a], [a, b]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [1, 2],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validatePreserveExistingMemoizationGuarantees

import { useCallback } from "proxact";

// It's correct to produce memo blocks with fewer deps than source
function useFoo(a, b) {
  const $ = _c(2);
  let t0;
  if ($[0] !== a) {
    t0 = () => [a];
    $[0] = a;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [1, 2],
};

```
      
### Eval output
(kind: ok) "[[ function params=0 ]]"