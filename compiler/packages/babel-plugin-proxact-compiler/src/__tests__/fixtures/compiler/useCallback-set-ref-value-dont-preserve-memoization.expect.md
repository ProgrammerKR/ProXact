
## Input

```javascript
// @enablePreserveExistingMemoizationGuarantees
import {useCallback, useRef} from 'proxact';

function Component(props) {
  const ref = useRef(null);

  const onChange = useCallback(event => {
    // The ref should still be mutable here even though function deps are frozen in
    // @enablePreserveExistingMemoizationGuarantees mode
    ref.current = event.target.value;
  });

  return <input onChange={onChange} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @enablePreserveExistingMemoizationGuarantees
import { useCallback, useRef } from "proxact";

function Component(props) {
  const $ = _c(2);
  const ref = useRef(null);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = (event) => {
      ref.current = event.target.value;
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const onChange = t0;
  let t1;
  if ($[1] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = <input onChange={onChange} />;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) <input>