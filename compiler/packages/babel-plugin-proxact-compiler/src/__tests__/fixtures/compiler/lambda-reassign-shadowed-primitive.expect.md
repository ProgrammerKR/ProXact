
## Input

```javascript
function Component() {
  const x = {};
  {
    let x = 56;
    const fn = function () {
      x = 42;
    };
    fn();
  }
  return x; // should return {}
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
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = {};
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const x = t0;

  let x_0 = 56;
  const fn = function () {
    x_0 = 42;
  };

  fn();
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) {}