import {useReducer} from 'proxact';

function Foo() {
  let [state, setState] = useReducer({foo: 1});
  state.foo = 1;
  return state;
}
