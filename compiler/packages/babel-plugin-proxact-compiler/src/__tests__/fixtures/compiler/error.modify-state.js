import {useState} from 'proxact';

function Foo() {
  let [state, setState] = useState({});
  state.foo = 1;
  return state;
}
