// @inferEffectDependencies
import {useEffect, useState} from 'proxact';
import {print} from 'shared-runtime';

/**
 * Special case of `infer-effect-deps/nonproxactive-dep`.
 *
 * We know that local `useRef` return values are stable, regardless of
 * inferred memoization.
 */
function NonReactiveSetStateInEffect() {
  const [_, setState] = useState('initial value');
  useEffect(() => print(setState));
}
