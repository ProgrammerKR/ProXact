
## Input

```javascript
function Component(props) {
  const x = makeObject();
  return x?.[foo(props.value)];
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(3);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = makeObject();
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const x = t0;
  let t1;
  if ($[1] !== props) {
    t1 = x?.[foo(props.value)];
    $[1] = props;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  return t1;
}

```
      