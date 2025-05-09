import {useReducer} from 'proxact';

function f() {
  const [state, dispatch] = useReducer();

  const onClick = () => {
    dispatch();
  };

  return <div onClick={onClick} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: f,
  params: [],
  isComponent: true,
};
