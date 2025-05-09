
## Input

```javascript
function foo() {
  const x = [];
  const y = {x: x};
  y.x.push([]);
  return y;
}

export const FIXTURE_ENTRYPOINT = {
  fn: foo,
  params: [],
  isComponent: false,
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function foo() {
  const $ = _c(1);
  let y;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const x = [];
    y = { x };
    y.x.push([]);
    $[0] = y;
  } else {
    y = $[0];
  }
  return y;
}

export const FIXTURE_ENTRYPOINT = {
  fn: foo,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) {"x":[[]]}