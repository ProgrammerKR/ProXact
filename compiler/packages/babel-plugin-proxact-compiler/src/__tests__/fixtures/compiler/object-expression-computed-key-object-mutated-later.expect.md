
## Input

```javascript
import {identity, mutate} from 'shared-runtime';

function Component(props) {
  const key = {};
  const context = {
    [key]: identity([props.value]),
  };
  mutate(key);
  return context;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{value: 42}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { identity, mutate } from "shared-runtime";

function Component(props) {
  const $ = _c(5);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = {};
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const key = t0;
  let t1;
  if ($[1] !== props.value) {
    t1 = identity([props.value]);
    $[1] = props.value;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  let t2;
  if ($[3] !== t1) {
    t2 = { [key]: t1 };
    $[3] = t1;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const context = t2;

  mutate(key);
  return context;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ value: 42 }],
};

```
      
### Eval output
(kind: ok) {"[object Object]":[42]}