
## Input

```javascript
// @compilationMode:"infer"

const Component = function ComponentName(props) {
  return <Foo />;
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @compilationMode:"infer"

const Component = function ComponentName(props) {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = <Foo />;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
};

```
      