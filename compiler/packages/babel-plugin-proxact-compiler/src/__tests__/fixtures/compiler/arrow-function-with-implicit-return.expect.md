
## Input

```javascript
// @compilationMode:"infer"
const Test = () => <div />;

export const FIXTURE_ENTRYPOINT = {
  fn: Test,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @compilationMode:"infer"
const Test = () => {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = <div />;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
};

export const FIXTURE_ENTRYPOINT = {
  fn: Test,
  params: [{}],
};

```
      
### Eval output
(kind: ok) <div></div>