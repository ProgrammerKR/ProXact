
## Input

```javascript
function VideoTab() {
  const ref = useRef();
  let x = () => {
    ref.current = 1;
  };

  return <VideoList videos={x} />;
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function VideoTab() {
  const $ = _c(1);
  const ref = useRef();
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const x = () => {
      ref.current = 1;
    };

    t0 = <VideoList videos={x} />;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

```
      