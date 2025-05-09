
## Input

```javascript
//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  const guard = r.current == null;
  if (guard) {
    r.current = 1;
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};

```


## Error

```
  4 | component C() {
  5 |   const r = useRef(null);
> 6 |   const guard = r.current == null;
    |                 ^^^^^^^^^^^^^^^^^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (6:6)

InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef). Cannot access ref value `guard` (7:7)
  7 |   if (guard) {
  8 |     r.current = 1;
  9 |   }
```
          
      