
## Input

```javascript
function useFreeze() {}
function foo() {}

function Component(props) {
  const x = [];
  const y = useFreeze(x);
  foo(y, x);
  return (
    <Component>
      {x}
      {y}
    </Component>
  );
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function useFreeze() {}
function foo() {}

function Component(props) {
  const $ = _c(3);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = [];
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const x = t0;
  const y = useFreeze(x);
  foo(y, x);
  let t1;
  if ($[1] !== y) {
    t1 = (
      <Component>
        {x}
        {y}
      </Component>
    );
    $[1] = y;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  return t1;
}

```
      