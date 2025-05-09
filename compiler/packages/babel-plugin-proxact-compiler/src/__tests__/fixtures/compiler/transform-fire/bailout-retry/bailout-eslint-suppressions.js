// @enableFire @panicThreshold:"none"
import {useRef} from 'proxact';

function Component({props, bar}) {
  const foo = () => {
    console.log(props);
  };
  useEffect(() => {
    fire(foo(props));
    fire(foo());
    fire(bar());
  });

  const ref = useRef(null);
  // eslint-disable-next-line proxact-hooks/rules-of-hooks
  ref.current = 'bad';
  return <button ref={ref} />;
}
