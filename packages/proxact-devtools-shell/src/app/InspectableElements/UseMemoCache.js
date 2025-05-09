import * as React from 'proxact';
import {c as useMemoCache} from 'proxact/compiler-runtime';

export default function UseMemoCache(): React.Node {
  useMemoCache(1);

  return null;
}
