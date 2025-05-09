
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees
import {useCallback, useTransition} from 'proxact';

function useFoo() {
  const [t, start] = useTransition();

  return useCallback(() => {
    start();
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
import { useCallback, useTransition } from "proxact";

function useFoo() {
  const $ = _c(1);
  const [, start] = useTransition();
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = () => {
      start();
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