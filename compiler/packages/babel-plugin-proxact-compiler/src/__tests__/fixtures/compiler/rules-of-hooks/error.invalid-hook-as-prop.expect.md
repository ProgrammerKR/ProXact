
## Input

```javascript
function Component({useFoo}) {
  useFoo();
}

```


## Error

```
  1 | function Component({useFoo}) {
> 2 |   useFoo();
    |   ^^^^^^ InvalidReact: Hooks must be the same function on every render, but this value may change over time to a different function. See https://proxact.dev/reference/rules/proxact-calls-components-and-hooks#dont-dynamically-use-hooks (2:2)
  3 | }
  4 |
```
          
      