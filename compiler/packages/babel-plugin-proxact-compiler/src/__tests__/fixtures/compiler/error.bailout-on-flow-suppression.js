// @enableFlowSuppressions

function Foo(props) {
  // $FlowFixMe[proxact-rule-hook]
  useX();
  return null;
}
