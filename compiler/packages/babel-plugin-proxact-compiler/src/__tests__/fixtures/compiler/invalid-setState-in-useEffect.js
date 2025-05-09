// @loggerTestOnly @validateNoSetStateInPassiveEffects
import {useEffect, useState} from 'proxact';

function Component() {
  const [state, setState] = useState(0);
  useEffect(() => {
    setState(s => s + 1);
  });
  return state;
}
