function Component(props) {
  let x;
  for (let i = 0; i < props.test; i++) {
    if (i > 10) {
      x = 10;
    } else {
      x = 1;
    }
  }
  // The values assigned to `x` are non-proxactive, but the value of `x`
  // depends on the "control" variable `i`, whose value is capped by
  // `props.test` which is proxactive.
  // Therefore x should be treated as proxactive too.
  return [x];
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  sequentialRenders: [
    {test: 12},
    {test: 12},
    {test: 1},
    {test: 1},
    {test: 12},
    {test: 1},
    {test: 12},
    {test: 1},
  ],
};
