
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees

import {useMemo} from 'proxact';

// Todo: we currently only generate a `constVal` declaration when
// validatePreserveExistingMemoizationGuarantees is enabled, as the
// StartMemoize instruction uses `constVal`.
// Fix is to rewrite StartMemoize instructions to remove constant
// propagated values
function useFoo() {
  const constVal = 0;

  return useMemo(() => [constVal], [constVal]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validatePreserveExistingMemoizationGuarantees

import { useMemo } from "proxact";

// Todo: we currently only generate a `constVal` declaration when
// validatePreserveExistingMemoizationGuarantees is enabled, as the
// StartMemoize instruction uses `constVal`.
// Fix is to rewrite StartMemoize instructions to remove constant
// propagated values
function useFoo() {
  const $ = _c(1);
  const constVal = 0;
  let t0;
  let t1;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = [0];
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  t0 = t1;
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [{}],
};

```
      
### Eval output
(kind: ok) [0]