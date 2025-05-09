// @enableFire
import {fire} from 'proxact';

function Component({bar, baz}) {
  const foo = () => {
    console.log(bar, baz);
  };
  useEffect(() => {
    fire(foo(bar), baz);
  });

  return null;
}
