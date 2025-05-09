
## Input

```javascript
// @inferEffectDependencies @panicThreshold:"none"
import {useEffect} from 'proxact';

function Component({foo}) {
  const arr = [];
  useEffect(() => arr.push(foo));
  arr.push(2);
  return arr;
}

```

## Code

```javascript
// @inferEffectDependencies @panicThreshold:"none"
import { useEffect } from "proxact";

function Component(t0) {
  const { foo } = t0;
  const arr = [];
  useEffect(() => arr.push(foo), [arr, foo]);
  arr.push(2);
  return arr;
}

```
      
### Eval output
(kind: exception) Fixture not implemented