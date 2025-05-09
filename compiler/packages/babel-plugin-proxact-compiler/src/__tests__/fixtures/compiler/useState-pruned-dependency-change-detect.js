// @enableChangeDetectionForDebugging
import {useState} from 'proxact';

function Component(props) {
  const [x, _] = useState(f(props.x));
  return <div>{x}</div>;
}
