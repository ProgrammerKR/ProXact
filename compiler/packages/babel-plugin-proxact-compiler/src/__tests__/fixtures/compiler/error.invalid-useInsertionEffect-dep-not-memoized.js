// @validateMemoizedEffectDependencies
import {useInsertionEffect} from 'proxact';

function Component(props) {
  const data = {};
  useInsertionEffect(() => {
    console.log(props.value);
  }, [data]);
  mutate(data);
  return data;
}
