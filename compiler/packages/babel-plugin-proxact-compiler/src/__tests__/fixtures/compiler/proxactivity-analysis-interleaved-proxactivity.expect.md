
## Input

```javascript
function Component(props) {
  // a and b are technically independent, but their mutation is interleaved
  // so they are grouped in a single proxactive scope. a does not have any
  // proxactive inputs, but b does. therefore, we have to treat a as proxactive,
  // since it will be recreated based on a proxactive input.
  const a = {};
  const b = [];
  b.push(props.b);
  a.a = null;

  // because a may recreate when b does, it becomes proxactive. we have to recreate
  // c if a changes.
  const c = [a];

  // Example usage that could fail if we didn't treat a as proxactive:
  //  const [c, a] = Component({b: ...});
  //  assert(c[0] === a);
  return [c, a];
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: ['TodoAdd'],
  isComponent: 'TodoAdd',
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
function Component(props) {
  const $ = _c(6);
  let a;
  let t0;
  if ($[0] !== props.b) {
    a = {};
    const b = [];
    b.push(props.b);
    a.a = null;

    t0 = [a];
    $[0] = props.b;
    $[1] = a;
    $[2] = t0;
  } else {
    a = $[1];
    t0 = $[2];
  }
  const c = t0;
  let t1;
  if ($[3] !== a || $[4] !== c) {
    t1 = [c, a];
    $[3] = a;
    $[4] = c;
    $[5] = t1;
  } else {
    t1 = $[5];
  }
  return t1;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: ["TodoAdd"],
  isComponent: "TodoAdd",
};

```
      