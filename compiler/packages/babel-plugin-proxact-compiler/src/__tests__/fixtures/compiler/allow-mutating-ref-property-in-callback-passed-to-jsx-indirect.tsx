// @validateRefAccessDuringRender
import {useRef} from 'proxact';

function Component() {
  const ref = useRef(null);

  const setRef = () => {
    if (ref.current !== null) {
      ref.current.value = '';
    }
  };

  const onClick = () => {
    setRef();
  };

  return (
    <>
      <input ref={ref} />
      <button onClick={onClick} />
    </>
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};
