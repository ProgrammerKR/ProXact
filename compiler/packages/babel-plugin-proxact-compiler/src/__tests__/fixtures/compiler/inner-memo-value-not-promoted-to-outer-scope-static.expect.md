
## Input

```javascript
function Component(props) {
  const count = new MaybeMutable();
  return (
    <View>
      <View>
        {<span>Text</span>}
        {<span>{maybeMutate(count)}</span>}
      </View>
    </View>
  );
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("proxact.memo_cache_sentinel")) {
    const count = new MaybeMutable();

    t0 = (
      <View>
        <View>
          <span>Text</span>
          <span>{maybeMutate(count)}</span>
        </View>
      </View>
    );
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

```
      