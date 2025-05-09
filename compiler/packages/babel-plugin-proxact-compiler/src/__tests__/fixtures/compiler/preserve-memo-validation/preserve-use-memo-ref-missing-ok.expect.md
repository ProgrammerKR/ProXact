
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees
import {useCallback, useRef} from 'proxact';

function useFoo() {
  const ref = useRef<undefined | (() => undefined)>();

  return useCallback(() => {
    if (ref != null) {
      ref.current();
    }
  }, []);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validatePreserveExistingMemoizationGuarantees
import { useCallback, useRef } from "proxact";

function useFoo() {
  const $ = _c(1);
  const ref = useRef();
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = () => {
      if (ref != null) {
        ref.current();
      }
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```
      
### Eval output
(kind: ok) "[[ function params=0 ]]"