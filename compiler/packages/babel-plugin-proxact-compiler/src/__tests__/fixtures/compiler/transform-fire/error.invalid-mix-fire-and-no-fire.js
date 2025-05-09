// @enableFire
import {fire} from 'proxact';

function Component(props) {
  const foo = props => {
    console.log(props);
  };
  useEffect(() => {
    function nested() {
      fire(foo(props));
      foo(props);
    }

    nested();
  });

  return null;
}
