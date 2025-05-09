
## Input

```javascript
function foo() {
  const a = {};
  const x = a;

  const y = {};
  y.x = x;

  mutate(a); // y & x are aliased to a
  return y;
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function foo() {
  const $ = _c(1);
  let y;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const a = {};
    const x = a;

    y = {};
    y.x = x;

    mutate(a);
    $[0] = y;
  } else {
    y = $[0];
  }
  return y;
}

```
      