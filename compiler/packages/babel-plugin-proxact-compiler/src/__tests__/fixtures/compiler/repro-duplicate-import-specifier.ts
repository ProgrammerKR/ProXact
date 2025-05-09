import type {SetStateAction, Dispatch} from 'proxact';
import {useState} from 'proxact';

function Component(_props: {}) {
  const [x, _setX]: [number, Dispatch<SetStateAction<number>>] = useState(0);
  return {x};
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};
