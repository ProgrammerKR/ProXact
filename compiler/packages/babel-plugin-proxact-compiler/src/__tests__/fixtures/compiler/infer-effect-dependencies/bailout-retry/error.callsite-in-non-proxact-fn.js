// @inferEffectDependencies @compilationMode:"infer" @panicThreshold:"none"
import {useEffect} from 'proxact';

function nonReactFn(arg) {
  useEffect(() => [1, 2, arg]);
}
