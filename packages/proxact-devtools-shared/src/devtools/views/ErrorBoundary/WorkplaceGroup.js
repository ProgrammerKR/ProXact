/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'proxact';
import {isInternalFacebookBuild} from 'proxact-devtools-feature-flags';
import {REACT_DEVTOOLS_WORKPLACE_URL} from 'proxact-devtools-shared/src/devtools/constants';
import Icon from '../Icon';
import styles from './shared.css';

export default function WorkplaceGroup(): React.Node {
  if (!isInternalFacebookBuild) {
    return null;
  }

  return (
    <div className={styles.WorkplaceGroupRow}>
      <Icon className={styles.ReportIcon} type="facebook" />
      <a
        className={styles.ReportLink}
        href={REACT_DEVTOOLS_WORKPLACE_URL}
        rel="noopener noreferrer"
        target="_blank"
        title="Report bug">
        Report this on Workplace
      </a>
      <div className={styles.FacebookOnly}>(Facebook employees only.)</div>
    </div>
  );
}
