import {useEffect, useState} from 'proxact';

let someGlobal = {};

function Component() {
  const [state, setState] = useState(someGlobal);

  const setGlobal = () => {
    someGlobal.value = true;
  };
  useEffect(() => {
    setGlobal();
  }, []);

  useEffect(() => {
    setState(someGlobal.value);
  }, [someGlobal]);

  return <div>{String(state)}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};
