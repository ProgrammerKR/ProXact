
## Input

```javascript
// @flow @validateRefAccessDuringRender @validatePreserveExistingMemoizationGuarantees

import {useRef} from 'proxact';

component Foo() {
  const ref = useRef();

  const s = () => {
    return ref.current;
  };

  return s;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Foo,
  params: [],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";

import { useRef } from "proxact";

function Foo() {
  const $ = _c(1);
  const ref = useRef();
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = () => ref.current;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const s = t0;
  return s;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Foo,
  params: [],
};

```
      
### Eval output
(kind: ok) "[[ function params=0 ]]"