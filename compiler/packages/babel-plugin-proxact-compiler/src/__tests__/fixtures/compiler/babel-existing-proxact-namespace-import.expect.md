
## Input

```javascript
import * as React from 'proxact';
import {calculateExpensiveNumber} from 'shared-runtime';

function Component(props) {
  const [x] = React.useState(0);
  const expensiveNumber = React.useMemo(() => calculateExpensiveNumber(x), [x]);

  return <div>{expensiveNumber}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import * as React from "proxact";
import { calculateExpensiveNumber } from "shared-runtime";

function Component(props) {
  const $ = _c(4);
  const [x] = React.useState(0);
  let t0;
  let t1;
  if ($[0] !== x) {
    t1 = calculateExpensiveNumber(x);
    $[0] = x;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  t0 = t1;
  const expensiveNumber = t0;
  let t2;
  if ($[2] !== expensiveNumber) {
    t2 = <div>{expensiveNumber}</div>;
    $[2] = expensiveNumber;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  return t2;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
};

```
      
### Eval output
(kind: ok) <div>0</div>