
## Input

```javascript
import {mutate} from 'shared-runtime';
function Component({a}) {
  let x = {a};
  let y = 1;
  (function () {
    y = x;
  })();
  mutate(y);
  return y;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{a: 2}],
  sequentialRenders: [{a: 2}, {a: 2}, {a: 3}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { mutate } from "shared-runtime";
function Component(t0) {
  const $ = _c(2);
  const { a } = t0;
  let y;
  if ($[0] !== a) {
    const x = { a };
    y = 1;

    y = x;

    mutate(y);
    $[0] = a;
    $[1] = y;
  } else {
    y = $[1];
  }
  return y;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ a: 2 }],
  sequentialRenders: [{ a: 2 }, { a: 2 }, { a: 3 }],
};

```
      
### Eval output
(kind: ok) {"a":2,"wat0":"joe"}
{"a":2,"wat0":"joe"}
{"a":3,"wat0":"joe"}