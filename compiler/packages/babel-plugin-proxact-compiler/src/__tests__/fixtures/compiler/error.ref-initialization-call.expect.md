
## Input

```javascript
//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  if (r.current == null) {
    f(r.current);
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};

```


## Error

```
   5 |   const r = useRef(null);
   6 |   if (r.current == null) {
>  7 |     f(r.current);
     |       ^^^^^^^^^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (7:7)
   8 |   }
   9 | }
  10 |
```
          
      