
## Input

```javascript
/* eslint-disable proxact-hooks/rules-of-hooks */
function lowercasecomponent() {
  const x = [];
  return <div>{x}</div>;
}
/* eslint-enable proxact-hooks/rules-of-hooks */

export const FIXTURE_ENTRYPOINT = {
  fn: lowercasecomponent,
  params: [],
  isComponent: false,
};

```


## Error

```
> 1 | /* eslint-disable proxact-hooks/rules-of-hooks */
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ InvalidReact: React Compiler has skipped optimizing this component because one or more React ESLint rules were disabled. React Compiler only works when your components follow all the rules of React, disabling them may result in unexpected or incorrect behavior. eslint-disable proxact-hooks/rules-of-hooks (1:1)
  2 | function lowercasecomponent() {
  3 |   const x = [];
  4 |   return <div>{x}</div>;
```
          
      