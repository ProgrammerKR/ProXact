
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees
import {useMemo} from 'proxact';
import {sum} from 'shared-runtime';

function Component({propA, propB}) {
  const x = propB.x.y;
  return useMemo(() => {
    return sum(propA.x, x);
  }, [propA.x, x]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{propA: {x: 2}, propB: {x: {y: 3}}}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validatePreserveExistingMemoizationGuarantees
import { useMemo } from "proxact";
import { sum } from "shared-runtime";

function Component(t0) {
  const $ = _c(3);
  const { propA, propB } = t0;
  const x = propB.x.y;
  let t1;
  let t2;
  if ($[0] !== propA.x || $[1] !== x) {
    t2 = sum(propA.x, x);
    $[0] = propA.x;
    $[1] = x;
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  t1 = t2;
  return t1;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ propA: { x: 2 }, propB: { x: { y: 3 } } }],
};

```
      
### Eval output
(kind: ok) 5