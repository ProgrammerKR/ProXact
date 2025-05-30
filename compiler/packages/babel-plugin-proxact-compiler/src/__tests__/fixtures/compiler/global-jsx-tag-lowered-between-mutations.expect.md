
## Input

```javascript
function Component(props) {
  const maybeMutable = new MaybeMutable();
  // NOTE: this will produce invalid output.
  // The HIR is roughly:
  //                                   ⌵ mutable range of `maybeMutable`
  // StoreLocal maybeMutable = ...     ⌝
  // t0 = LoadGlobal View              ⎮ <-- View is lowered inside this mutable range
  //                                         and thus gets becomes an output of this scope,
  //                                         gets promoted to temporary
  // t1 = LoadGlobal maybeMutate       ⎮
  // t2 = LoadLocal maybeMutable       ⎮
  // t3 = Call t1(t2)                  ⌟
  // t4 = Jsx tag=t0 props=[] children=[t3] <-- `t0` is an invalid tag
  return <View>{maybeMutate(maybeMutable)}</View>;
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const maybeMutable = new MaybeMutable();

    t0 = <View>{maybeMutate(maybeMutable)}</View>;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

```
      