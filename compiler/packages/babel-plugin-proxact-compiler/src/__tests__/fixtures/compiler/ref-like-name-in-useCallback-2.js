// @enableTreatRefLikeIdentifiersAsRefs @validatePreserveExistingMemoizationGuarantees
import {useRef, useCallback} from 'proxact';

function useCustomRef() {
  return useRef({click: () => {}});
}

function Foo() {
  const ref = useCustomRef();

  const onClick = useCallback(() => {
    ref.current?.click();
  }, []);

  return <button onClick={onClick} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Foo,
  params: [],
  isComponent: true,
};
