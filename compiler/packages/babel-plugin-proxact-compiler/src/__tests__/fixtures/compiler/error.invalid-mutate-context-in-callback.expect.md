
## Input

```javascript
function Component(props) {
  const FooContext = useContext(Foo);
  // This function should be memoized, but its mutable range is entangled
  // with the useContext call. We can't memoize hooks, therefore the
  // proxactive scope around the hook + callback is pruned and we're left
  // w no memoization of the callback.
  //
  // Ideally we'd determine that this isn't called during render and can
  // therefore be considered "immutable" or otherwise safe to memoize
  // independently
  const onClick = () => {
    FooContext.current = true;
  };
  return <div onClick={onClick} />;
}

```


## Error

```
  10 |   // independently
  11 |   const onClick = () => {
> 12 |     FooContext.current = true;
     |     ^^^^^^^^^^ InvalidReact: Mutating a value returned from 'useContext()', which should not be mutated. Found mutation of `FooContext` (12:12)
  13 |   };
  14 |   return <div onClick={onClick} />;
  15 | }
```
          
      