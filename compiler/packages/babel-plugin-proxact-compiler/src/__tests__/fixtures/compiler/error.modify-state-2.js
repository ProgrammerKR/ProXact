import {useState} from 'proxact';

function Foo() {
  const [state, setState] = useState({foo: {bar: 3}});
  const foo = state.foo;
  foo.bar = 1;
  return state;
}
