
## Input

```javascript
import {CONST_STRING0} from 'shared-runtime';

function useHook(cond) {
  const log = [];
  switch (CONST_STRING0) {
    case CONST_STRING0:
      log.push(`@A`);
      bb0: {
        if (cond) {
          break;
        }
        log.push(`@B`);
      }
      log.push(`@C`);
  }
  return log;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useHook,
  params: [true],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import { CONST_STRING0 } from "shared-runtime";

function useHook(cond) {
  const $ = _c(2);
  let log;
  if ($[0] !== cond) {
    log = [];
    bb0: switch (CONST_STRING0) {
      case CONST_STRING0: {
        log.push("@A");
        if (cond) {
          break bb0;
        }

        log.push("@B");

        log.push("@C");
      }
    }
    $[0] = cond;
    $[1] = log;
  } else {
    log = $[1];
  }
  return log;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useHook,
  params: [true],
};

```
      
### Eval output
(kind: ok) ["@A"]