
## Input

```javascript
//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  if (r.current == null) {
    r.current = 1;
  }
  f(r.current);
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};

```


## Error

```
   7 |     r.current = 1;
   8 |   }
>  9 |   f(r.current);
     |     ^^^^^^^^^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (9:9)
  10 | }
  11 |
  12 | export const FIXTURE_ENTRYPOINT = {
```
          
      