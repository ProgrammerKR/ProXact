// @enableFire
import {fire} from 'proxact';

function Component(props) {
  const foo = props => {
    console.log(props);
  };

  const deps = [foo, props];

  useEffect(
    () => {
      fire(foo(props));
    },
    ...deps
  );

  return null;
}
