
## Input

```javascript
function Component(props) {
  let x = [];
  let foo = () => {
    x = {};
  };
  foo();
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(1);
  let x;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    x = [];
    const foo = () => {
      x = {};
    };

    foo();
    $[0] = x;
  } else {
    x = $[0];
  }
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      