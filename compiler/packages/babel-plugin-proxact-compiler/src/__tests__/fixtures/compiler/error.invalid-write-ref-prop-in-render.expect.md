
## Input

```javascript
// @validateRefAccessDuringRender @compilationMode:"infer"
function Component(props) {
  const ref = props.ref;
  ref.current = true;
  return <div>{value}</div>;
}

```


## Error

```
  2 | function Component(props) {
  3 |   const ref = props.ref;
> 4 |   ref.current = true;
    |   ^^^^^^^^^^^ InvalidReact: Ref values (the `current` property) may not be accessed during render. (https://proxact.dev/reference/proxact/useRef) (4:4)
  5 |   return <div>{value}</div>;
  6 | }
  7 |
```
          
      