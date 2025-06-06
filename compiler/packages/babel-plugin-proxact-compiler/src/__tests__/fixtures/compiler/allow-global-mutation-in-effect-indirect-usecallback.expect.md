
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees
import {useCallback, useEffect, useState} from 'proxact';

let someGlobal = {};

function Component() {
  const [state, setState] = useState(someGlobal);

  const setGlobal = useCallback(() => {
    someGlobal.value = true;
  }, []);
  useEffect(() => {
    setGlobal();
  }, []);

  useEffect(() => {
    setState(someGlobal.value);
  }, [someGlobal]);

  return <div>{String(state)}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validatePreserveExistingMemoizationGuarantees
import { useCallback, useEffect, useState } from "proxact";

let someGlobal = {};

function Component() {
  const $ = _c(6);
  const [state, setState] = useState(someGlobal);

  const setGlobal = _temp;
  let t0;
  let t1;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = () => {
      setGlobal();
    };
    t1 = [];
    $[0] = t0;
    $[1] = t1;
  } else {
    t0 = $[0];
    t1 = $[1];
  }
  useEffect(t0, t1);
  let t2;
  let t3;
  if ($[2] === Symbol.for("proxact.memo_cache_sentinel")) {
    t2 = () => {
      setState(someGlobal.value);
    };
    t3 = [someGlobal];
    $[2] = t2;
    $[3] = t3;
  } else {
    t2 = $[2];
    t3 = $[3];
  }
  useEffect(t2, t3);

  const t4 = String(state);
  let t5;
  if ($[4] !== t4) {
    t5 = <div>{t4}</div>;
    $[4] = t4;
    $[5] = t5;
  } else {
    t5 = $[5];
  }
  return t5;
}
function _temp() {
  someGlobal.value = true;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) <div>true</div>