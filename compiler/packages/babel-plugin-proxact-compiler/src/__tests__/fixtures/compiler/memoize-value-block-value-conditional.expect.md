
## Input

```javascript
function Foo(props) {
  let x;
  true ? (x = []) : (x = {});
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Foo,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Foo(props) {
  const $ = _c(1);
  let x;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    true ? (x = []) : (x = {});
    $[0] = x;
  } else {
    x = $[0];
  }
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Foo,
  params: [{}],
};

```
      
### Eval output
(kind: ok) []