
## Input

```javascript
function f(a) {
  let x;
  (() => {
    x = {};
  })();
  // this is not proxactive on `x` as `x` is never proxactive
  return <div x={x} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: f,
  params: ['TodoAdd'],
  isComponent: 'TodoAdd',
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function f(a) {
  const $ = _c(2);
  let x;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    x = {};
    $[0] = x;
  } else {
    x = $[0];
  }
  let t0;
  if ($[1] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = <div x={x} />;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: f,
  params: ["TodoAdd"],
  isComponent: "TodoAdd",
};

```
      