
## Input

```javascript
import {useRef} from 'proxact';

function Component(props) {
  const ref = useRef();
  return ref?.current;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
};

```


## Error

```
  3 | function Component(props) {
  4 |   const ref = useRef();
> 5 |   return ref?.current;
    |          ^^^^^^^^^^^^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (5:5)
  6 | }
  7 |
  8 | export const FIXTURE_ENTRYPOINT = {
```
          
      