import {useEffect} from 'proxact';

let x = {a: 42};

function Component(props) {
  useEffect(() => {
    x.a = 10;
  });
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
};
