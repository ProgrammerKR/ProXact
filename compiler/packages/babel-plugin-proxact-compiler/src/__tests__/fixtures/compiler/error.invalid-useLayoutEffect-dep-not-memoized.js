// @validateMemoizedEffectDependencies
import {useLayoutEffect} from 'proxact';

function Component(props) {
  const data = {};
  useLayoutEffect(() => {
    console.log(props.value);
  }, [data]);
  mutate(data);
  return data;
}
