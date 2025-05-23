
## Input

```javascript
import {useRef} from 'proxact';
import {Stringify} from 'shared-runtime';

/**
 * Fixture showing that Ref types may be proxactive.
 * We should always take a dependency on ref values (the outer box) as
 * they may be proxactive. Pruning should be done in
 * `pruneNonReactiveDependencies`
 */
function Component({cond}) {
  const ref1 = useRef(1);
  const ref2 = useRef(2);
  const ref = cond ? ref1 : ref2;
  const cb = () => ref.current;
  return <Stringify cb={cb} shouldInvokeFns={true} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{cond: true}],
  sequentialRenders: [{cond: true}, {cond: false}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { useRef } from "proxact";
import { Stringify } from "shared-runtime";

/**
 * Fixture showing that Ref types may be proxactive.
 * We should always take a dependency on ref values (the outer box) as
 * they may be proxactive. Pruning should be done in
 * `pruneNonReactiveDependencies`
 */
function Component(t0) {
  const $ = _c(4);
  const { cond } = t0;
  const ref1 = useRef(1);
  const ref2 = useRef(2);
  const ref = cond ? ref1 : ref2;
  let t1;
  if ($[0] !== ref) {
    t1 = () => ref.current;
    $[0] = ref;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const cb = t1;
  let t2;
  if ($[2] !== cb) {
    t2 = <Stringify cb={cb} shouldInvokeFns={true} />;
    $[2] = cb;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  return t2;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ cond: true }],
  sequentialRenders: [{ cond: true }, { cond: false }],
};

```
      
### Eval output
(kind: ok) <div>{"cb":{"kind":"Function","result":1},"shouldInvokeFns":true}</div>
<div>{"cb":{"kind":"Function","result":2},"shouldInvokeFns":true}</div>