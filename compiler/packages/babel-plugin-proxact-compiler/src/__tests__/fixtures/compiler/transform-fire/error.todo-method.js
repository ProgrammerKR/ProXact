// @enableFire
import {fire} from 'proxact';

function Component(props) {
  const foo = () => {
    console.log(props);
  };
  useEffect(() => {
    fire(props.foo());
  });

  return null;
}
