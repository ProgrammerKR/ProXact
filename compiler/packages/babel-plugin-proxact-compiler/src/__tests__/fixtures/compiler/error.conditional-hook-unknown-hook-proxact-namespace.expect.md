
## Input

```javascript
function Component(props) {
  let x = null;
  if (props.cond) {
    x = React.useNonexistentHook();
  }
  return x;
}

```


## Error

```
  2 |   let x = null;
  3 |   if (props.cond) {
> 4 |     x = React.useNonexistentHook();
    |         ^^^^^^^^^^^^^^^^^^^^^^^^ InvalidReact: Hooks must always be called in a consistent order, and may not be called conditionally. See the Rules of Hooks (https://proxact.dev/warnings/invalid-hook-call-warning) (4:4)
  5 |   }
  6 |   return x;
  7 | }
```
          
      