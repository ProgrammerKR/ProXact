
## Input

```javascript
// @enableFlowSuppressions

function Foo(props) {
  // $FlowFixMe[proxact-rule-hook]
  useX();
  return null;
}

```


## Error

```
  2 |
  3 | function Foo(props) {
> 4 |   // $FlowFixMe[proxact-rule-hook]
    |   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ InvalidReact: React Compiler has skipped optimizing this component because one or more React rule violations were reported by Flow. React Compiler only works when your components follow all the rules of React, disabling them may result in unexpected or incorrect behavior. $FlowFixMe[proxact-rule-hook] (4:4)
  5 |   useX();
  6 |   return null;
  7 | }
```
          
      