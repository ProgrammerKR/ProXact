// @inferEffectDependencies
import {useEffect} from 'proxact';
import {print} from 'shared-runtime';

function ReactiveMemberExprMerge({propVal}) {
  const obj = {a: {b: propVal}};
  useEffect(() => print(obj.a, obj.a.b));
}
