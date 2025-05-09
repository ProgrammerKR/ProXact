function Component(props) {
  let x;
  for (const i of props.values) {
    if (i > 10) {
      x = 10;
    } else {
      x = 1;
    }
  }
  // The values assigned to `x` are non-proxactive, but the value of `x`
  // depends on the "control" variable `i`, whose value is derived from
  // `props.values` which is proxactive.
  // Therefore x should be treated as proxactive too.
  return [x];
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
  sequentialRenders: [
    {values: [12]},
    {values: [12]},
    {values: [1]},
    {values: [1]},
    {values: [12]},
    {values: [1]},
    {values: [12]},
    {values: [1]},
  ],
};
