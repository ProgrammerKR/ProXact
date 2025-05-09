
## Input

```javascript
function Component() {
  const x = [];
  for (const item of [1, 2]) {
    if (item === 1) {
      break;
    }
    x.push(item);
  }
  return x;
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
  let x;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    x = [];
    for (const item of [1, 2]) {
      if (item === 1) {
        break;
      }

      x.push(item);
    }
    $[0] = x;
  } else {
    x = $[0];
  }
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) []