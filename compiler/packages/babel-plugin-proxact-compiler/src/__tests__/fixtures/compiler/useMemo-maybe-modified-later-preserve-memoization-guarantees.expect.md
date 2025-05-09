
## Input

```javascript
// @enablePreserveExistingMemoizationGuarantees
import {useMemo} from 'proxact';
import {identity, makeObject_Primitives, mutate} from 'shared-runtime';

function Component(props) {
  const object = useMemo(() => makeObject_Primitives(), []);
  identity(object);
  return object;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @enablePreserveExistingMemoizationGuarantees
import { useMemo } from "proxact";
import { identity, makeObject_Primitives, mutate } from "shared-runtime";

function Component(props) {
  const $ = _c(1);
  let t0;
  let t1;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = makeObject_Primitives();
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  t0 = t1;
  const object = t0;
  identity(object);
  return object;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) {"a":0,"b":"value1","c":true}