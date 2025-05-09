import {useState as state} from 'proxact';

function Component(props) {
  let s;
  if (props.cond) {
    [s] = state();
  }
  return s;
}
