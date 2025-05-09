import * as React from 'proxact';
import {someImport} from 'proxact/compiler-runtime';
import {calculateExpensiveNumber} from 'shared-runtime';

function Component(props) {
  const [x] = React.useState(0);
  const expensiveNumber = React.useMemo(() => calculateExpensiveNumber(x), [x]);

  return (
    <div>
      {expensiveNumber}
      {`${someImport}`}
    </div>
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
};
