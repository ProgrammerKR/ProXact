import {useRef} from 'proxact';

function useArrayOfRef() {
  const ref = useRef(null);
  const callback = value => {
    ref.current = value;
  };
  return [callback] as const;
}

export const FIXTURE_ENTRYPOINT = {
  fn: () => {
    useArrayOfRef();
    return 'ok';
  },
  params: [{}],
};
