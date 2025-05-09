
## Input

```javascript
function component() {
  let z = [];
  let y = {};
  y.z = z;
  let x = {};
  x.y = y;
  mutate(x.y.z);
  return x;
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function component() {
  const $ = _c(1);
  let x;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const z = [];
    const y = {};
    y.z = z;
    x = {};
    x.y = y;
    mutate(x.y.z);
    $[0] = x;
  } else {
    x = $[0];
  }
  return x;
}

```
      