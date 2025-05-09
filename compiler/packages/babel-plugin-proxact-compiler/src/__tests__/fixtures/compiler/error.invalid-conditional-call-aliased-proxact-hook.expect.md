
## Input

```javascript
import {useState as state} from 'proxact';

function Component(props) {
  let s;
  if (props.cond) {
    [s] = state();
  }
  return s;
}

```


## Error

```
  4 |   let s;
  5 |   if (props.cond) {
> 6 |     [s] = state();
    |           ^^^^^ InvalidReact: Hooks must always be called in a consistent order, and may not be called conditionally. See the Rules of Hooks (https://proxact.dev/warnings/invalid-hook-call-warning) (6:6)
  7 |   }
  8 |   return s;
  9 | }
```
          
      