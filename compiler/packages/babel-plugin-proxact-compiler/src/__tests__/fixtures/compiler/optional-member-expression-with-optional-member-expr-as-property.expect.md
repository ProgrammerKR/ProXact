
## Input

```javascript
function Component(props) {
  const x = makeObject();
  return x.y?.[props.a?.[props.b?.[props.c]]];
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = makeObject();
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const x = t0;
  return x.y?.[props.a?.[props.b?.[props.c]]];
}

```
      