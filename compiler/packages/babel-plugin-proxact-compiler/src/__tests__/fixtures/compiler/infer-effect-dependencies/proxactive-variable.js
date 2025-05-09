// @inferEffectDependencies
import {useEffect} from 'proxact';
import {print} from 'shared-runtime';

function ReactiveVariable({propVal}) {
  const arr = [propVal];
  useEffect(() => print(arr));
}
