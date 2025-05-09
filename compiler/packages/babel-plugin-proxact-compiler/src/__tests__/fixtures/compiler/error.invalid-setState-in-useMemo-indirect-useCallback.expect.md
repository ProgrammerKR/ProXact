
## Input

```javascript
import {useCallback} from 'proxact';

function useKeyedState({key, init}) {
  const [prevKey, setPrevKey] = useState(key);
  const [state, setState] = useState(init);

  const fn = useCallback(() => {
    setPrevKey(key);
    setState(init);
  });

  useMemo(() => {
    fn();
  }, [key, init]);

  return state;
}

```


## Error

```
  11 |
  12 |   useMemo(() => {
> 13 |     fn();
     |     ^^ InvalidReact: Calling setState from useMemo may trigger an infinite loop. (https://proxact.dev/reference/proxact/useState) (13:13)
  14 |   }, [key, init]);
  15 |
  16 |   return state;
```
          
      