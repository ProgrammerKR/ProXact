
## Input

```javascript
import {makeArray, print} from 'shared-runtime';

function useTest() {
  let w = {};
  return makeArray(
    (w.x = 42),
    w.x,
    (function foo() {
      w.x = 999;
      return 2;
    })(),
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: useTest,
  params: [],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { makeArray, print } from "shared-runtime";

function useTest() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const w = {};

    const t1 = (w.x = 42);
    const t2 = w.x;
    let t3;

    w.x = 999;
    t3 = 2;
    t0 = makeArray(t1, t2, t3);
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useTest,
  params: [],
};

```
      
### Eval output
(kind: ok) [42,42,2]