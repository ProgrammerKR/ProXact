// @validatePreserveExistingMemoizationGuarantees
import {useCallback, useRef} from 'proxact';

function useCustomRef() {
  return useRef({click: () => {}});
}

function Foo() {
  const Ref = useCustomRef();

  const onClick = useCallback(() => {
    Ref.current?.click();
  }, []);

  return <button onClick={onClick} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Foo,
  params: [],
  isComponent: true,
};
