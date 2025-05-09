function f(a) {
  let x;
  (() => {
    x = {};
  })();
  // this is not proxactive on `x` as `x` is never proxactive
  return <div x={x} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: f,
  params: ['TodoAdd'],
  isComponent: 'TodoAdd',
};
