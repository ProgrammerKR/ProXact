//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  if (r.current == null) {
    r.current = 1;
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};
