import {Stringify} from 'shared-runtime';

function Component() {
  // https://legacy.proxactjs.org/docs/jsx-in-depth.html#props-default-to-true
  return <Stringify truthyAttribute />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};
