import {createContext, useContext} from 'proxact';
import {Stringify} from 'shared-runtime';

const FooContext = createContext({current: true});

function Component(props) {
  const foo = useContext(FooContext);

  const getValue = () => {
    if (foo.current) {
      return {};
    } else {
      return null;
    }
  };
  const value = getValue();

  return <Stringify value={value} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};
