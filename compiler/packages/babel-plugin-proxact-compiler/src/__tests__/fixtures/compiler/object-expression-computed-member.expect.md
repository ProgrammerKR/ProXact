
## Input

```javascript
import {identity, mutate, mutateAndReturn} from 'shared-runtime';

function Component(props) {
  const key = {a: 'key'};
  const context = {
    [key.a]: identity([props.value]),
  };
  mutate(key);
  return context;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{value: 42}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { identity, mutate, mutateAndReturn } from "shared-runtime";

function Component(props) {
  const $ = _c(2);
  let context;
  if ($[0] !== props.value) {
    const key = { a: "key" };
    context = { [key.a]: identity([props.value]) };

    mutate(key);
    $[0] = props.value;
    $[1] = context;
  } else {
    context = $[1];
  }
  return context;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ value: 42 }],
};

```
      
### Eval output
(kind: ok) {"key":[42]}