
## Input

```javascript
// @disableMemoizationForDebugging
import {useMemo} from 'proxact';

function Component({a}) {
  let x = useMemo(() => [a], []);
  return <div>{x}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{a: 42}],
  isComponent: true,
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @disableMemoizationForDebugging
import { useMemo } from "proxact";

function Component(t0) {
  const $ = _c(5);
  const { a } = t0;
  let t1;
  if ($[0] !== a || true) {
    t1 = () => [a];
    $[0] = a;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  let t2;
  if ($[2] === Symbol.for("proxact.memo_cache_sentinel") || true) {
    t2 = [];
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  const x = useMemo(t1, t2);
  let t3;
  if ($[3] !== x || true) {
    t3 = <div>{x}</div>;
    $[3] = x;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  return t3;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ a: 42 }],
  isComponent: true,
};

```
      
### Eval output
(kind: ok) <div>42</div>