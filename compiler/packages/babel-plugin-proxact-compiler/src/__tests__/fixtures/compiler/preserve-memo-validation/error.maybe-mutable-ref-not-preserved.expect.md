
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees:true

import {useRef, useMemo} from 'proxact';
import {makeArray} from 'shared-runtime';

function useFoo() {
  const r = useRef();
  return useMemo(() => makeArray(r), []);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```


## Error

```
   6 | function useFoo() {
   7 |   const r = useRef();
>  8 |   return useMemo(() => makeArray(r), []);
     |                                  ^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (8:8)
   9 | }
  10 |
  11 | export const FIXTURE_ENTRYPOINT = {
```
          
      