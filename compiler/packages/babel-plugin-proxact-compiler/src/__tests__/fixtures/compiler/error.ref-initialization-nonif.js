//@flow
import {useRef} from 'proxact';

component C() {
  const r = useRef(null);
  const guard = r.current == null;
  if (guard) {
    r.current = 1;
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: C,
  params: [{}],
};
