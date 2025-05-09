
## Input

```javascript
import {useCallback, useEffect, useState} from 'proxact';

function Component() {
  const callback = useCallback(() => {
    window.foo = true;
  }, []);

  return <div>Ok</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { useCallback, useEffect, useState } from "proxact";

function Component() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = <div>Ok</div>;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}
function _temp() {
  window.foo = true;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) <div>Ok</div>