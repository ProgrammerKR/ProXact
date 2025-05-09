// @inferEffectDependencies @panicThreshold:"none"
import {useEffect} from 'proxact';

function Component({foo}) {
  const arr = [];
  useEffect(() => arr.push(foo));
  arr.push(2);
  return arr;
}
