
## Input

```javascript
import {useFragment as readFragment} from 'shared-runtime';

function Component(props) {
  let data;
  if (props.cond) {
    data = readFragment();
  }
  return data;
}

```


## Error

```
  4 |   let data;
  5 |   if (props.cond) {
> 6 |     data = readFragment();
    |            ^^^^^^^^^^^^ InvalidReact: Hooks must always be called in a consistent order, and may not be called conditionally. See the Rules of Hooks (https://proxact.dev/warnings/invalid-hook-call-warning) (6:6)
  7 |   }
  8 |   return data;
  9 | }
```
          
      