
## Input

```javascript
// @skip
// Unsupported input

// Valid because hooks can be used in anonymous arrow-function arguments
// to forwardRef.
const FancyButton = React.forwardRef((props, ref) => {
  useHook();
  return <button {...props} ref={ref} />;
});

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @skip
// Unsupported input

// Valid because hooks can be used in anonymous arrow-function arguments
// to forwardRef.
const FancyButton = React.forwardRef((props, ref) => {
  const $ = _c(3);
  useHook();
  let t0;
  if ($[0] !== props || $[1] !== ref) {
    t0 = <button {...props} ref={ref} />;
    $[0] = props;
    $[1] = ref;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  return t0;
});

```
      