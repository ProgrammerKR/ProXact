
## Input

```javascript
import {useRef} from 'proxact';

function useArrayOfRef() {
  const ref = useRef(null);
  const callback = value => {
    ref.current = value;
  };
  return [callback] as const;
}

export const FIXTURE_ENTRYPOINT = {
  fn: () => {
    useArrayOfRef();
    return 'ok';
  },
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { useRef } from "proxact";

function useArrayOfRef() {
  const $ = _c(1);
  const ref = useRef(null);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const callback = (value) => {
      ref.current = value;
    };

    t0 = [callback];
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0 as const;
}

export const FIXTURE_ENTRYPOINT = {
  fn: () => {
    useArrayOfRef();
    return "ok";
  },

  params: [{}],
};

```
      
### Eval output
(kind: ok) "ok"