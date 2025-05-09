
## Input

```javascript
function Foo() {}

function Component(props) {
  const a = [];
  const b = {};
  new Foo(a, b);
  let _ = <div a={a} />;
  new Foo(b);
  return <div a={a} b={b} />;
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Foo() {}

function Component(props) {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const a = [];
    const b = {};
    new Foo(a, b);
    new Foo(b);
    t0 = <div a={a} b={b} />;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

```
      