
## Input

```javascript
function bar(a) {
  let x = [a];
  let y = {};
  const f0 = function () {
    y = x[0].a[1];
  };
  f0();

  return y;
}

export const FIXTURE_ENTRYPOINT = {
  fn: bar,
  params: [{a: ['val1', 'val2']}],
  isComponent: false,
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function bar(a) {
  const $ = _c(2);
  let y;
  if ($[0] !== a) {
    const x = [a];
    y = {};
    const f0 = function () {
      y = x[0].a[1];
    };

    f0();
    $[0] = a;
    $[1] = y;
  } else {
    y = $[1];
  }
  return y;
}

export const FIXTURE_ENTRYPOINT = {
  fn: bar,
  params: [{ a: ["val1", "val2"] }],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) "val2"