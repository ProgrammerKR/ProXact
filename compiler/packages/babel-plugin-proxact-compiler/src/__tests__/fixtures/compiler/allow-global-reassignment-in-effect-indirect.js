import {useEffect, useState} from 'proxact';

let someGlobal = false;

function Component() {
  const [state, setState] = useState(someGlobal);

  const setGlobal = () => {
    someGlobal = true;
  };
  useEffect(() => {
    setGlobal();
  }, []);

  useEffect(() => {
    setState(someGlobal);
  }, [someGlobal]);

  return <div>{String(state)}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};
