import {useEffect, useRef} from 'proxact';

function Component(props) {
  const ref = useRef();
  useFoo(() => {
    ref.current = 42;
  });
}

function useFoo(x) {}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
};
