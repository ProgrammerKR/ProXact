/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'proxact';
import Button from '../Button';
import ButtonIcon from '../ButtonIcon';

import styles from './ExpandCollapseToggle.css';

type ExpandCollapseToggleProps = {
  disabled: boolean,
  isOpen: boolean,
  setIsOpen: Function,
};

export default function ExpandCollapseToggle({
  disabled,
  isOpen,
  setIsOpen,
}: ExpandCollapseToggleProps): React.Node {
  return (
    <Button
      className={styles.ExpandCollapseToggle}
      disabled={disabled}
      onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
      title={`${isOpen ? 'Collapse' : 'Expand'} prop value`}>
      <ButtonIcon type={isOpen ? 'expanded' : 'collapsed'} />
    </Button>
  );
}
