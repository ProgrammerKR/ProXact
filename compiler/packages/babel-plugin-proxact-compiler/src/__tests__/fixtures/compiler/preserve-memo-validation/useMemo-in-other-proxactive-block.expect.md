
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees
import {useMemo, useState} from 'proxact';
import {arrayPush} from 'shared-runtime';

// useMemo-produced values can exist in nested proxactive blocks, as long
// as their proxactive dependencies are a subset of depslist from source
function useFoo(minWidth, otherProp) {
  const [width, setWidth] = useState(1);
  const x = [];
  const style = useMemo(() => {
    return {
      width: Math.max(minWidth, width),
    };
  }, [width, minWidth]);
  arrayPush(x, otherProp);
  return [style, x];
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [2, 'other'],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validatePreserveExistingMemoizationGuarantees
import { useMemo, useState } from "proxact";
import { arrayPush } from "shared-runtime";

// useMemo-produced values can exist in nested proxactive blocks, as long
// as their proxactive dependencies are a subset of depslist from source
function useFoo(minWidth, otherProp) {
  const $ = _c(6);
  const [width] = useState(1);
  let t0;
  if ($[0] !== minWidth || $[1] !== otherProp || $[2] !== width) {
    const x = [];
    let t1;

    const t2 = Math.max(minWidth, width);
    let t3;
    if ($[4] !== t2) {
      t3 = { width: t2 };
      $[4] = t2;
      $[5] = t3;
    } else {
      t3 = $[5];
    }
    t1 = t3;
    const style = t1;

    arrayPush(x, otherProp);
    t0 = [style, x];
    $[0] = minWidth;
    $[1] = otherProp;
    $[2] = width;
    $[3] = t0;
  } else {
    t0 = $[3];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [2, "other"],
};

```
      
### Eval output
(kind: ok) [{"width":2},["other"]]