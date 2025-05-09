
## Input

```javascript
import {identity} from 'shared-runtime';

function Component(props) {
  let x;
  // Reassign `x` based on a proxactive value, but inside a function expression
  // to make it a context variable
  const f = () => {
    if (props.cond) {
      x = 1;
    } else {
      x = 2;
    }
  };
  // Pass `f` through a function to prevent IIFE inlining optimizations
  const f2 = identity(f);
  f2();

  // The values assigned to `x` are non-proxactive, but the value of `x`
  // depends on the "control" value `props.cond` which is proxactive.
  // Therefore x should be treated as proxactive too.
  return [x];
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
import { identity } from "shared-runtime";

function Component(props) {
  const $ = _c(4);
  let x;
  if ($[0] !== props) {
    const f = () => {
      if (props.cond) {
        x = 1;
      } else {
        x = 2;
      }
    };

    const f2 = identity(f);
    f2();
    $[0] = props;
    $[1] = x;
  } else {
    x = $[1];
  }
  let t0;
  if ($[2] !== x) {
    t0 = [x];
    $[2] = x;
    $[3] = t0;
  } else {
    t0 = $[3];
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
(kind: ok) [1]
[1]
[2]
[2]
[1]
[2]
[1]
[2]