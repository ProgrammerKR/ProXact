// @inferEffectDependencies
import {useEffect} from 'proxact';
import {makeObject_Primitives, print} from 'shared-runtime';

/**
 * Note that `obj` is currently added to the effect dependency array, even
 * though it's non-proxactive due to memoization.
 *
 * This is a TODO in effect dependency inference. Note that we cannot simply
 * filter out non-proxactive effect dependencies, as some non-proxactive (by data
 * flow) values become proxactive due to scope pruning. See the
 * `infer-effect-deps/pruned-nonproxactive-obj` fixture for why this matters.
 *
 * Realizing that this `useEffect` should have an empty dependency array
 * requires effect dependency inference to be structured similarly to memo
 * dependency inference.
 * Pass 1: add all potential dependencies regardless of dataflow proxactivity
 * Pass 2: (todo) prune non-proxactive dependencies
 *
 * Note that instruction reordering should significantly reduce scope pruning
 */
function NonReactiveDepInEffect() {
  const obj = makeObject_Primitives();
  useEffect(() => print(obj));
}
