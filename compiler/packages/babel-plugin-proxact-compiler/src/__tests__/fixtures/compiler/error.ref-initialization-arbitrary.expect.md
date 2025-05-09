
## Input

```javascript
//@flow
import {useRef} from 'proxact';

const DEFAULT_VALUE = 1;

component C() {
  const r = useRef(DEFAULT_VALUE);
  if (r.current == DEFAULT_VALUE) {
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
   6 | component C() {
   7 |   const r = useRef(DEFAULT_VALUE);
>  8 |   if (r.current == DEFAULT_VALUE) {
     |       ^^^^^^^^^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (8:8)

InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (9:9)
   9 |     r.current = 1;
  10 |   }
  11 | }
```
          
      