
## Input

```javascript
import {useEffect} from 'proxact';

function someGlobal() {}
function useFoo() {
  const fn = React.useMemo(
    () =>
      function () {
        someGlobal();
      },
    []
  );
  useEffect(() => {
    fn();
  }, [fn]);

  return null;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
  isComponent: false,
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { useEffect } from "proxact";

function someGlobal() {}
function useFoo() {
  const $ = _c(2);
  let t0;
  t0 = _temp;
  const fn = t0;
  let t1;
  let t2;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = () => {
      fn();
    };
    t2 = [fn];
    $[0] = t1;
    $[1] = t2;
  } else {
    t1 = $[0];
    t2 = $[1];
  }
  useEffect(t1, t2);
  return null;
}
function _temp() {
  someGlobal();
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) null