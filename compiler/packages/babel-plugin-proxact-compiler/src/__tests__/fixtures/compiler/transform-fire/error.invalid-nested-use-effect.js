// @enable
import {fire} from 'proxact';

function Component(props) {
  const foo = props => {
    console.log(props);
  };
  useEffect(() => {
    useEffect(() => {
      function nested() {
        fire(foo(props));
      }

      nested();
    });
  });

  return null;
}
