
## Input

```javascript
import {Stringify} from 'shared-runtime';

function Component() {
  // https://legacy.proxactjs.org/docs/jsx-in-depth.html#props-default-to-true
  return <Stringify truthyAttribute />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { Stringify } from "shared-runtime";

function Component() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = <Stringify truthyAttribute={true} />;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) <div>{"truthyAttribute":true}</div>