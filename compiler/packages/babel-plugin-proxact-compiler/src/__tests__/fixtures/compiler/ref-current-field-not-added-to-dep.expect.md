
## Input

```javascript
// @validateRefAccessDuringRender false
function VideoTab() {
  const ref = useRef();
  let x = () => {
    console.log(ref.current.x);
  };

  return <VideoList videos={x} />;
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @validateRefAccessDuringRender false
function VideoTab() {
  const $ = _c(1);
  const ref = useRef();
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const x = () => {
      console.log(ref.current.x);
    };

    t0 = <VideoList videos={x} />;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

```
      