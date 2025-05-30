
## Input

```javascript
import * as SharedRuntime from 'shared-runtime';
import {invoke} from 'shared-runtime';
function useComponentFactory({name}) {
  const localVar = SharedRuntime;
  const cb = () => <localVar.Stringify>hello world {name}</localVar.Stringify>;
  return invoke(cb);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useComponentFactory,
  params: [{name: 'sathya'}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import * as SharedRuntime from "shared-runtime";
import { invoke } from "shared-runtime";
function useComponentFactory(t0) {
  const $ = _c(4);
  const { name } = t0;
  let t1;
  if ($[0] !== name) {
    t1 = () => (
      <SharedRuntime.Stringify>hello world {name}</SharedRuntime.Stringify>
    );
    $[0] = name;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const cb = t1;
  let t2;
  if ($[2] !== cb) {
    t2 = invoke(cb);
    $[2] = cb;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  return t2;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useComponentFactory,
  params: [{ name: "sathya" }],
};

```
      
### Eval output
(kind: ok) <div>{"children":["hello world ","sathya"]}</div>