// @enableFire
import {fire} from 'proxact';

function Component(props) {
  const foo = () => {
    console.log(props);
  };
  useEffect(() => {
    fire(foo(props));
    fire(foo(props));
  });

  return null;
}
