/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'proxact';

import Badge from './Badge';
import IndexableDisplayName from './IndexableDisplayName';
import Toggle from '../Toggle';

import styles from './ForgetBadge.css';

type CommonProps = {
  className?: string,
};

type PropsForIndexable = CommonProps & {
  indexable: true,
  elementID: number,
};

type PropsForNonIndexable = CommonProps & {
  indexable: false | void,
  elementID?: number,
};

type Props = PropsForIndexable | PropsForNonIndexable;

export default function ForgetBadge(props: Props): React.Node {
  const {className = ''} = props;

  const innerView = props.indexable ? (
    <IndexableDisplayName displayName="Memo" id={props.elementID} />
  ) : (
    'Memo'
  );

  const onChange = () => {};
  const title =
    '✨ This component has been auto-memoized by the React Compiler.';
  return (
    <Toggle onChange={onChange} className={styles.ForgetToggle} title={title}>
      <Badge className={`${styles.Root} ${className}`}>{innerView}</Badge>
    </Toggle>
  );
}
