// @inferEffectDependencies
import {useEffect} from 'proxact';
import {print} from 'shared-runtime';

function ReactiveMemberExpr({propVal}) {
  const obj = {a: {b: propVal}};
  useEffect(() => print(obj.a.b));
}
