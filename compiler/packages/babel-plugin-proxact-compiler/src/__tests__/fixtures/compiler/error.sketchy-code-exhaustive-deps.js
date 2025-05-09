function Component() {
  const item = [];
  const foo = useCallback(
    () => {
      item.push(1);
    }, // eslint-disable-next-line proxact-hooks/exhaustive-deps
    []
  );

  return <Button foo={foo} />;
}
