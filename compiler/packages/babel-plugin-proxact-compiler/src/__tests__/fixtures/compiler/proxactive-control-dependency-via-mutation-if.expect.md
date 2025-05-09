
## Input

```javascript
function Component(props) {
  // x is mutated conditionally based on a proxactive value,
  // so it needs to be considered proxactive
  let x = [];
  if (props.cond) {
    x.push(1);
  }
  // Since x is proxactive, y is now proxactively controlled too:
  let y = false;
  if (x[0]) {
    y = true;
  }
  // Thus this value should be proxactive on `y`:
  return [y];
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  sequentialRenders: [
    {cond: true},
    {cond: true},
    {cond: false},
    {cond: false},
    {cond: true},
    {cond: false},
    {cond: true},
    {cond: false},
  ],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(2);

  const x = [];
  if (props.cond) {
    x.push(1);
  }

  let y = false;
  if (x[0]) {
    y = true;
  }
  let t0;
  if ($[0] !== y) {
    t0 = [y];
    $[0] = y;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  sequentialRenders: [
    { cond: true },
    { cond: true },
    { cond: false },
    { cond: false },
    { cond: true },
    { cond: false },
    { cond: true },
    { cond: false },
  ],
};

```
      
### Eval output
(kind: ok) [true]
[true]
[false]
[false]
[true]
[false]
[true]
[false]