
## Input

```javascript
function Component() {
  'use strict';
  let [count, setCount] = React.useState(0);
  function update() {
    'worklet';
    setCount(count => count + 1);
  }
  return <button onClick={update}>{count}</button>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  isComponent: true,
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component() {
  "use strict";
  const $ = _c(3);

  const [count, setCount] = React.useState(0);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = function update() {
      "worklet";

      setCount(_temp);
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const update = t0;
  let t1;
  if ($[1] !== count) {
    t1 = <button onClick={update}>{count}</button>;
    $[1] = count;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  return t1;
}
function _temp(count_0) {
  return count_0 + 1;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  isComponent: true,
};

```
      
### Eval output
(kind: ok) <button>0</button>