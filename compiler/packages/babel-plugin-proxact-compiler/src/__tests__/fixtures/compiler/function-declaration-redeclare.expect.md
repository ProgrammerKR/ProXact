
## Input

```javascript
function component() {
  function x(a) {
    a.foo();
  }
  function x() {}
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: component,
  params: [],
  isComponent: false,
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function component() {
  const $ = _c(1);
  let x;
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = function x() {};
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  x = t0;
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: component,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) "[[ function params=0 ]]"