
## Input

```javascript
//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  const r2 = useRef(null);
  if (r.current == null) {
    r2.current = 1;
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};

```


## Error

```
   6 |   const r2 = useRef(null);
   7 |   if (r.current == null) {
>  8 |     r2.current = 1;
     |     ^^^^^^^^^^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (8:8)
   9 |   }
  10 | }
  11 |
```
          
      