
## Input

```javascript
// @validateNoSetStateInRender:false
import {useMemo} from 'proxact';
import {makeArray} from 'shared-runtime';

function Component() {
  const x = useMemo(makeArray, []);
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validateNoSetStateInRender:false
import { useMemo } from "proxact";
import { makeArray } from "shared-runtime";

function Component() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = makeArray();
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const x = t0;
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      