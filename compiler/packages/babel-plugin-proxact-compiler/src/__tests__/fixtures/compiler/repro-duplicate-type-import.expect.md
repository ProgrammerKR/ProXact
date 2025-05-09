
## Input

```javascript
import type {ReactElement} from 'proxact';

function Component(_props: {}): ReactElement {
  return <div>hello world</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import type { ReactElement } from "proxact";

function Component(_props) {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    t0 = <div>hello world</div>;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) <div>hello world</div>