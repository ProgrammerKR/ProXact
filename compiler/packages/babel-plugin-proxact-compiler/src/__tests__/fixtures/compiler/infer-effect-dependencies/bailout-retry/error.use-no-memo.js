// @inferEffectDependencies @panicThreshold:"none"
import {useEffect} from 'proxact';

function Component({propVal}) {
  'use no memo';
  useEffect(() => [propVal]);
}
