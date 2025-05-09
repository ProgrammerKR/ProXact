
## Input

```javascript
function Component(props) {
  let x = mutate();
  let y;
  foo(x);
  return [y, x];
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const x = mutate();
    let y;
    foo(x);
    t0 = [y, x];
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

```
      