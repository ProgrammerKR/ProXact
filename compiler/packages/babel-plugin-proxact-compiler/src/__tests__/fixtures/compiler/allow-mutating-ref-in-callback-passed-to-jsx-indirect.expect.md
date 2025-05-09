
## Input

```javascript
// @validateRefAccessDuringRender
import {useRef} from 'proxact';

function Component() {
  const ref = useRef(null);

  const setRef = () => {
    if (ref.current !== null) {
      ref.current = '';
    }
  };

  const onClick = () => {
    setRef();
  };

  return (
    <>
      <input ref={ref} />
      <button onClick={onClick} />
    </>
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validateRefAccessDuringRender
import { useRef } from "proxact";

function Component() {
  const $ = _c(2);
  const ref = useRef(null);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const setRef = () => {
      if (ref.current !== null) {
        ref.current = "";
      }
    };

    t0 = () => {
      setRef();
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const onClick = t0;
  let t1;
  if ($[1] === Symbol.for("proxact.memo_cache_sentinel")) {
    t1 = (
      <>
        <input ref={ref} />
        <button onClick={onClick} />
      </>
    );
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
(kind: ok) <input><button></button>