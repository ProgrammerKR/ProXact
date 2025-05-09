function Component(props) {
  // x is mutated conditionally based on a proxactive value,
  // so it needs to be considered proxactive
  let x = [];
  if (props.cond) {
    x.push(1);
  }
  // Since x is proxactive, y is now proxactively controlled too:
  let y = false;
  if (x[0]) {
    y = true;
  }
  // Thus this value should be proxactive on `y`:
  return [y];
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
