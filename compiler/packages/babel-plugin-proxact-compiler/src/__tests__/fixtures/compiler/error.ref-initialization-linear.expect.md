
## Input

```javascript
//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  if (r.current == null) {
    r.current = 42;
    r.current = 42;
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};

```


## Error

```
   6 |   if (r.current == null) {
   7 |     r.current = 42;
>  8 |     r.current = 42;
     |     ^^^^^^^^^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (8:8)
   9 |   }
  10 | }
  11 |
```
          
      