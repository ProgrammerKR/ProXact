
## Input

```javascript
function Component({}) {
  const outer = () => {
    const inner = () => {
      return x;
    };
    const x = 3;
    return inner();
  };
  return <div>{outer()}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(t0) {
  const $ = _c(1);
  const outer = _temp;
  let t1;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = <div>{outer()}</div>;
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  return t1;
}
function _temp() {
  const inner = () => x;
  const x = 3;
  return inner();
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) <div>3</div>