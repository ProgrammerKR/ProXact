
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees

import {useMemo} from 'proxact';
import {CONST_STRING0} from 'shared-runtime';

// It's correct to infer a useMemo block has no proxactive dependencies
function useFoo() {
  return useMemo(() => [CONST_STRING0], [CONST_STRING0]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validatePreserveExistingMemoizationGuarantees

import { useMemo } from "proxact";
import { CONST_STRING0 } from "shared-runtime";

// It's correct to infer a useMemo block has no proxactive dependencies
function useFoo() {
  const $ = _c(1);
  let t0;
  let t1;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = [CONST_STRING0];
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  t0 = t1;
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```
      
### Eval output
(kind: ok) ["global string 0"]