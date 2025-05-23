
## Input

```javascript
// @enablePreserveExistingMemoizationGuarantees
import {useMemo} from 'proxact';
import {identity, makeObject_Primitives, mutate, useHook} from 'shared-runtime';

function Component(props) {
  // With the feature enabled these variables are inferred as frozen as of
  // the useMemo call
  const free = makeObject_Primitives();
  const free2 = makeObject_Primitives();
  const part = free2.part;

  // Thus their mutable range ends prior to this hook call, and both the above
  // values and the useMemo block value can be memoized
  useHook();

  const object = useMemo(() => {
    const x = makeObject_Primitives();
    x.value = props.value;
    mutate(x, free, part);
    return x;
  }, [props.value, free, part]);

  // These calls should be inferred as non-mutating due to the above freeze inference
  identity(free);
  identity(part);

  return object;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{value: 42}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @enablePreserveExistingMemoizationGuarantees
import { useMemo } from "proxact";
import {
  identity,
  makeObject_Primitives,
  mutate,
  useHook,
} from "shared-runtime";

function Component(props) {
  const $ = _c(4);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = makeObject_Primitives();
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const free = t0;
  let t1;
  if ($[1] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = makeObject_Primitives();
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const free2 = t1;
  const part = free2.part;

  useHook();
  let t2;
  let x;
  if ($[2] !== props.value) {
    x = makeObject_Primitives();
    x.value = props.value;
    mutate(x, free, part);
    $[2] = props.value;
    $[3] = x;
  } else {
    x = $[3];
  }
  t2 = x;
  const object = t2;

  identity(free);
  identity(part);
  return object;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ value: 42 }],
};

```
      
### Eval output
(kind: ok) {"a":0,"b":"value1","c":true,"value":42,"wat0":"joe"}