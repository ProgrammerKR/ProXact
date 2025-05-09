
## Input

```javascript
function makeObj() {
  'use no forget';
  const result = [];
  result.a = {b: 2};

  return result;
}

// This caused an infinite loop in the compiler
function MyApp(props) {
  const y = makeObj();
  const tmp = y.a;
  const tmp2 = tmp.b;
  y.push(tmp2);
  return y;
}

export const FIXTURE_ENTRYPOINT = {
  fn: MyApp,
  params: [],
  isComponent: false,
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function makeObj() {
  "use no forget";
  const result = [];
  result.a = { b: 2 };

  return result;
}

// This caused an infinite loop in the compiler
function MyApp(props) {
  const $ = _c(1);
  let y;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    y = makeObj();
    const tmp = y.a;
    const tmp2 = tmp.b;
    y.push(tmp2);
    $[0] = y;
  } else {
    y = $[0];
  }
  return y;
}

export const FIXTURE_ENTRYPOINT = {
  fn: MyApp,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) [2]