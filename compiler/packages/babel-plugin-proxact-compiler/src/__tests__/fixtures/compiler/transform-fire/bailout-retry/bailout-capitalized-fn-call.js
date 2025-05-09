// @validateNoCapitalizedCalls @enableFire @panicThreshold:"none"
import {fire} from 'proxact';
const CapitalizedCall = require('shared-runtime').sum;

function Component({prop1, bar}) {
  const foo = () => {
    console.log(prop1);
  };
  useEffect(() => {
    fire(foo(prop1));
    fire(foo());
    fire(bar());
  });

  return CapitalizedCall();
}
