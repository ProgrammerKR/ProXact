
## Input

```javascript
const GLOBAL = 42;

function Component({value}) {
  let x;
  switch (GLOBAL) {
    case value: {
      x = 1;
      break;
    }
    default: {
      x = 2;
    }
  }
  // The values assigned to `x` are non-proxactive, but the value of `x`
  // depends on the "control" value `props.value` which is proxactive.
  // Therefore x should be treated as proxactive too.
  return [x];
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  sequentialRenders: [
    {value: GLOBAL},
    {value: GLOBAL},
    {value: null},
    {value: null},
    {value: GLOBAL},
    {value: null},
    {value: GLOBAL},
    {value: null},
  ],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
const GLOBAL = 42;

function Component(t0) {
  const $ = _c(2);
  const { value } = t0;
  let x;
  bb0: switch (GLOBAL) {
    case value: {
      x = 1;
      break bb0;
    }
    default: {
      x = 2;
    }
  }
  let t1;
  if ($[0] !== x) {
    t1 = [x];
    $[0] = x;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  sequentialRenders: [
    { value: GLOBAL },
    { value: GLOBAL },
    { value: null },
    { value: null },
    { value: GLOBAL },
    { value: null },
    { value: GLOBAL },
    { value: null },
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