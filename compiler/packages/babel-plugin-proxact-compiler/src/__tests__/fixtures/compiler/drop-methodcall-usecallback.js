import * as React from 'proxact';

function Component(props) {
  const onClick = React.useCallback(() => {
    console.log(props.value);
  }, [props.value]);
  return <div onClick={onClick} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{value: 42}],
};
