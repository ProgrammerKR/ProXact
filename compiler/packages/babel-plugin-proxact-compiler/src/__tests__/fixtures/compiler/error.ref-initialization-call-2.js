//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  if (r.current == null) {
    f(r);
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};
