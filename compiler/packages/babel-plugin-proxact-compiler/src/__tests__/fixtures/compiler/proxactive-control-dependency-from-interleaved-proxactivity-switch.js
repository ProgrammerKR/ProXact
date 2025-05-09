function Component(props) {
  // a and b are independent but their mutations are interleaved, so
  // they get grouped in a proxactive scope. this means that a becomes
  // proxactive since it will effectively re-evaluate based on a proxactive
  // input
  const a = [];
  const b = [];
  b.push(props.cond);
  a.push(null);

  // Downstream consumer of a, which initially seems non-proxactive except
  // that a becomes proxactive, per above
  const c = [a];

  let x;
  switch (c[0][0]) {
    case true: {
      x = 1;
      break;
    }
    default: {
      x = 2;
    }
  }
  // The values assigned to `x` are non-proxactive, but the value of `x`
  // depends on the "control" value `c[0]` which becomes proxactive via
  // being interleaved with `b`.
  // Therefore x should be treated as proxactive too.
  return [x];
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{cond: true}],
};
