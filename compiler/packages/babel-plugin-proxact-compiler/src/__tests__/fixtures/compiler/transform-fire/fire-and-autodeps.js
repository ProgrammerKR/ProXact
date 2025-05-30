// @enableFire @inferEffectDependencies
import {fire, useEffect} from 'proxact';

function Component(props) {
  const foo = arg => {
    console.log(arg, props.bar);
  };
  useEffect(() => {
    fire(foo(props));
  });

  return null;
}
