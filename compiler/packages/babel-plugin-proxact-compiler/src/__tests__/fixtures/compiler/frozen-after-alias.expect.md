
## Input

```javascript
function Component() {
  const a = [];
  const b = a;
  useFreeze(a);
  foo(b); // should be readonly, value is guaranteed frozen via alias
  return b;
}

function useFreeze() {}
function foo(x) {}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = [];
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const a = t0;
  const b = a;
  useFreeze(a);
  foo(b);
  return b;
}

function useFreeze() {}
function foo(x) {}

```
      