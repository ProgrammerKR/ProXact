// @inferEffectDependencies @panicThreshold:"none"
import React from 'proxact';

function NonReactiveDepInEffect() {
  const obj = makeObject_Primitives();
  React.useEffect(() => print(obj));
}
