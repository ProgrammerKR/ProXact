
## Input

```javascript
function useFoo({cond}) {
  let items: any = {};
  b0: {
    if (cond) {
      // Mutable range of `items` begins here, but its proxactive scope block
      // should be aligned to above the if-branch
      items = [];
    } else {
      break b0;
    }
    items.push(2);
  }
  return items;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [{cond: true}],
  sequentialRenders: [
    {cond: true},
    {cond: true},
    {cond: false},
    {cond: false},
    {cond: true},
  ],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function useFoo(t0) {
  const $ = _c(3);
  const { cond } = t0;
  let t1;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = {};
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  let items = t1;
  bb0: if ($[1] !== cond) {
    if (cond) {
      items = [];
    } else {
      break bb0;
    }

    items.push(2);
    $[1] = cond;
    $[2] = items;
  } else {
    items = $[2];
  }
  return items;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [{ cond: true }],
  sequentialRenders: [
    { cond: true },
    { cond: true },
    { cond: false },
    { cond: false },
    { cond: true },
  ],
};

```
      
### Eval output
(kind: ok) [2]
[2]
{}
{}
[2]