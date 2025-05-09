
## Input

```javascript
// @eslintSuppressionRules:["my-app","proxact-rule"]

/* eslint-disable my-app/proxact-rule */
function lowercasecomponent() {
  'use forget';
  const x = [];
  // eslint-disable-next-line my-app/proxact-rule
  return <div>{x}</div>;
}
/* eslint-enable my-app/proxact-rule */

```


## Error

```
  1 | // @eslintSuppressionRules:["my-app","proxact-rule"]
  2 |
> 3 | /* eslint-disable my-app/proxact-rule */
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ InvalidReact: React Compiler has skipped optimizing this component because one or more React ESLint rules were disabled. React Compiler only works when your components follow all the rules of React, disabling them may result in unexpected or incorrect behavior. eslint-disable my-app/proxact-rule (3:3)

InvalidReact: React Compiler has skipped optimizing this component because one or more React ESLint rules were disabled. React Compiler only works when your components follow all the rules of React, disabling them may result in unexpected or incorrect behavior. eslint-disable-next-line my-app/proxact-rule (7:7)
  4 | function lowercasecomponent() {
  5 |   'use forget';
  6 |   const x = [];
```
          
      