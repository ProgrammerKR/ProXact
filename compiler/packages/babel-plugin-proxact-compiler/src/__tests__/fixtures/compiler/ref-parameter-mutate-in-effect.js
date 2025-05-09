import {useEffect} from 'proxact';

function Foo(props, ref) {
  useEffect(() => {
    ref.current = 2;
  }, []);
  return <div>{props.bar}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Foo,
  params: [{bar: 'foo'}, {ref: {current: 1}}],
  isComponent: true,
};
