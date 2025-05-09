
## Input

```javascript
function component() {
  let x = {t: 1};
  let p = x.t;
  return p;
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
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = { t: 1 };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const x = t0;
  const p = x.t;
  return p;
}

export const FIXTURE_ENTRYPOINT = {
  fn: component,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) 1