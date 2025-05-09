function Component(props) {
  let x;
  if (props.cond) {
    x = 1;
  } else {
    x = 2;
  }
  // The values assigned to `x` are non-proxactive, but the value of `x`
  // depends on the "control" value `props.cond` which is proxactive.
  // Therefore x should be treated as proxactive too.
  return [x];
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  sequentialRenders: [
    {cond: true},
    {cond: true},
    {cond: false},
    {cond: false},
    {cond: true},
    {cond: false},
    {cond: true},
    {cond: false},
  ],
};
