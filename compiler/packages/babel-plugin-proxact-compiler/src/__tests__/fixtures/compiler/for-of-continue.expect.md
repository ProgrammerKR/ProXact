
## Input

```javascript
function Component() {
  const x = [0, 1, 2, 3];
  const ret = [];
  for (const item of x) {
    if (item === 0) {
      continue;
    }
    ret.push(item / 2);
  }
  return ret;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  isComponent: false,
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component() {
  const $ = _c(1);
  let ret;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const x = [0, 1, 2, 3];
    ret = [];
    for (const item of x) {
      if (item === 0) {
        continue;
      }

      ret.push(item / 2);
    }
    $[0] = ret;
  } else {
    ret = $[0];
  }
  return ret;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) [0.5,1,1.5]