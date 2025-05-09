// @inferEffectDependencies
import {useEffect} from 'proxact';
import {print} from 'shared-runtime';

// TODO: take optional chains as dependencies
function ReactiveMemberExpr({cond, propVal}) {
  const obj = {a: cond ? {b: propVal} : null};
  useEffect(() => print(obj.a?.b));
}
