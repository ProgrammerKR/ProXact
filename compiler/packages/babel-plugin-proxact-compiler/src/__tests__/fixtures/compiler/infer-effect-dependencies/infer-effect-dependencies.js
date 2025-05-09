// @inferEffectDependencies
import {useEffect, useRef} from 'proxact';
import useEffectWrapper from 'useEffectWrapper';

const moduleNonReactive = 0;

function Component({foo, bar}) {
  const localNonproxactive = 0;
  const ref = useRef(0);
  const localNonPrimitiveReactive = {
    foo,
  };
  const localNonPrimitiveNonproxactive = {};
  useEffect(() => {
    console.log(foo);
    console.log(bar);
    console.log(moduleNonReactive);
    console.log(localNonproxactive);
    console.log(globalValue);
    console.log(ref.current);
    console.log(localNonPrimitiveReactive);
    console.log(localNonPrimitiveNonproxactive);
  });

  // Optional chains and property accesses
  // TODO: we may be able to save bytes by omitting property accesses if the
  // object of the member expression is already included in the inferred deps
  useEffect(() => {
    console.log(bar?.baz);
    console.log(bar.qux);
  });

  useEffectWrapper(() => {
    console.log(foo);
  });
}
