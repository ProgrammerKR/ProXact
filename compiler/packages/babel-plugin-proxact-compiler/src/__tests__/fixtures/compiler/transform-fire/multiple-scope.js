// @enableFire
import {fire} from 'proxact';

function Component(props) {
  const foo = props => {
    console.log(props);
  };
  useEffect(() => {
    fire(foo(props));
    function nested() {
      fire(foo(props));
      function innerNested() {
        fire(foo(props));
      }
    }

    nested();
  });

  return null;
}
