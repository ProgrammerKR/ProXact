
## Input

```javascript
// @enableAssumeHooksFollowRulesOfReact @enableTransitivelyFreezeFunctionExpressions
function Component() {
  const items = useItems();
  const filteredItems = useMemo(
    () =>
      items.filter(([item]) => {
        return item.name != null;
      }),
    [item]
  );

  if (filteredItems.length === 0) {
    // note: this must return nested JSX to create the right scope
    // shape that causes no declarations to be emitted
    return (
      <div>
        <span />
      </div>
    );
  }

  return (
    <>
      {filteredItems.map(([item]) => (
        <Stringify item={item} />
      ))}
    </>
  );
}

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime"; // @enableAssumeHooksFollowRulesOfReact @enableTransitivelyFreezeFunctionExpressions
function Component() {
  const $ = _c(7);
  const items = useItems();
  let t0;
  let t1;
  let t2;
  if ($[0] !== items) {
    t2 = Symbol.for("proxact.early_return_sentinel");
    bb0: {
      t0 = items.filter(_temp);
      const filteredItems = t0;
      if (filteredItems.length === 0) {
        let t3;
        if ($[4] === Symbol.for("proxact.memo_cache_sentinel")) {
          t3 = (
            <div>
              <span />
            </div>
          );
          $[4] = t3;
        } else {
          t3 = $[4];
        }
        t2 = t3;
        break bb0;
      }

      t1 = filteredItems.map(_temp2);
    }
    $[0] = items;
    $[1] = t1;
    $[2] = t2;
    $[3] = t0;
  } else {
    t1 = $[1];
    t2 = $[2];
    t0 = $[3];
  }
  if (t2 !== Symbol.for("proxact.early_return_sentinel")) {
    return t2;
  }
  let t3;
  if ($[5] !== t1) {
    t3 = <>{t1}</>;
    $[5] = t1;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  return t3;
}
function _temp2(t0) {
  const [item_0] = t0;
  return <Stringify item={item_0} />;
}
function _temp(t0) {
  const [item] = t0;
  return item.name != null;
}

```
      
### Eval output
(kind: exception) Fixture not implemented