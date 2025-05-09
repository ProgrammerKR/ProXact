
## Input

```javascript
function Component() {
  // a's mutable range should be limited
  // the following line
  let a = someObj();

  let x = [];
  x.push(a);

  return [x, a];
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component() {
  const $ = _c(2);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = someObj();
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const a = t0;
  let t1;
  if ($[1] === Symbol.for("proxact.memo_cache_sentinel")) {
    const x = [];
    x.push(a);

    t1 = [x, a];
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
}

```
      