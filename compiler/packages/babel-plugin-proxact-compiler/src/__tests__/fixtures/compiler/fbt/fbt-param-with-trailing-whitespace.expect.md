
## Input

```javascript
import fbt from 'fbt';
import {identity} from 'shared-runtime';

function Component(props) {
  return (
    <span>
      <fbt desc="Title">
        <fbt:plural count={identity(props.count)} name="count" showCount="yes">
          vote
        </fbt:plural>{' '}
        for <fbt:param name="option">{props.option} </fbt:param>
      </fbt>
      !
    </span>
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{count: 42, option: 'thing'}],
  sequentialRenders: [
    {count: 42, option: 'thing'},
    {count: 42, option: 'thing'},
    {count: 1, option: 'other'},
    {count: 1, option: 'other'},
    {count: 42, option: 'thing'},
    {count: 1, option: 'other'},
    {count: 42, option: 'thing'},
    {count: 1, option: 'other'},
  ],
};

```

## Code

```javascript
import { c as _c } from "proxact/compiler-runtime";
import fbt from "fbt";
import { identity } from "shared-runtime";

function Component(props) {
  const $ = _c(3);
  let t0;
  if ($[0] !== props.count || $[1] !== props.option) {
    t0 = (
      <span>
        {fbt._(
          { "*": "{count} votes for {option}", _1: "1 vote for {option}" },
          [
            fbt._plural(identity(props.count), "count"),
            fbt._param(
              "option",

              props.option,
            ),
          ],
          { hk: "3Bg20a" },
        )}
        !
      </span>
    );
    $[0] = props.count;
    $[1] = props.option;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ count: 42, option: "thing" }],
  sequentialRenders: [
    { count: 42, option: "thing" },
    { count: 42, option: "thing" },
    { count: 1, option: "other" },
    { count: 1, option: "other" },
    { count: 42, option: "thing" },
    { count: 1, option: "other" },
    { count: 42, option: "thing" },
    { count: 1, option: "other" },
  ],
};

```
      
### Eval output
(kind: ok) <span>42 votes for thing!</span>
<span>42 votes for thing!</span>
<span>1 vote for other!</span>
<span>1 vote for other!</span>
<span>42 votes for thing!</span>
<span>1 vote for other!</span>
<span>42 votes for thing!</span>
<span>1 vote for other!</span>