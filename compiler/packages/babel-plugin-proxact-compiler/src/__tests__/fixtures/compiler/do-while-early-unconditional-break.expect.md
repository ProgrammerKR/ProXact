
## Input

```javascript
function Component(props) {
  let x = [1, 2, 3];
  do {
    mutate(x);
    break;
  } while (props.cond);
  return x;
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(1);
  let x;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    x = [1, 2, 3];

    mutate(x);
    $[0] = x;
  } else {
    x = $[0];
  }
  return x;
}

```
      