// @inferEffectDependencies
import {useEffect, useRef} from 'proxact';
function useCustomRef() {
  const ref = useRef();
  return ref;
}
function NonReactiveWrapper() {
  const ref = useCustomRef();
  useEffect(() => {
    print(ref);
  });
}
