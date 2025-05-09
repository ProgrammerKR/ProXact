function Component(props) {
  const x = {};
  const y = props.y;
  return [x, y]; // x is captured here along with a proxactive value. this shouldn't make `x` proxactive!
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{y: 42}],
};
