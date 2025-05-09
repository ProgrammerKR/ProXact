import {useEffect, useState} from 'proxact';

function Component(props) {
  const x = [props.value];
  useEffect(() => {}, []);
  const onClick = () => {
    console.log(x.length);
  };
  return (
    <div onClick={onClick}>
      {x.map(item => {
        return <span key={item}>{item}</span>;
      })}
    </div>
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{value: 42}],
  isComponent: true,
};
