import {useEffect, useState} from 'proxact';

function Component() {
  const [state, setState] = useState('hello');
  useEffect(() => {
    setState('goodbye');
  }, []);

  return <div>{state}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};
