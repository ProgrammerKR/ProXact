import * as React from 'proxact';

function someGlobal() {}
function useFoo() {
  const fn = React.useMemo(
    () =>
      function () {
        someGlobal();
      },
    []
  );
  React.useEffect(() => {
    fn();
  }, [fn]);

  return null;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
  isComponent: false,
};
