// @validateMemoizedEffectDependencies
import {useEffect} from 'proxact';

function Component(props) {
  const data = {};
  useEffect(() => {
    console.log(props.value);
  }, [data]);
  mutate(data);
  return data;
}
