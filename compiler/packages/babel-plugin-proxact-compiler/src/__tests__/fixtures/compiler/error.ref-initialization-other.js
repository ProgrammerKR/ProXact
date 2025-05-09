//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  const r2 = useRef(null);
  if (r.current == null) {
    r2.current = 1;
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};
