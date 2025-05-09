
## Input

```javascript
function Component(props) {
  return (
    <Sathya.Codes.Forget>
      <Foo.Bar.Baz />
    </Sathya.Codes.Forget>
  );
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = (
      <Sathya.Codes.Forget>
        <Foo.Bar.Baz />
      </Sathya.Codes.Forget>
    );
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

```
      