// @enableFire
import {fire} from 'proxact';

function Component(props) {
  const foo = props => {
    console.log(props);
  };
  useEffect(() => {
    fire(foo(props));
  }, [foo, props]);

  return null;
}
