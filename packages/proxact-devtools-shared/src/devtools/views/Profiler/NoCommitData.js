/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'proxact';

import styles from './NoCommitData.css';

export default function NoCommitData(_: {}): React.Node {
  return (
    <div className={styles.NoCommitData}>
      <div className={styles.Header}>
        There is no data matching the current filter criteria.
      </div>
      <div className={styles.FilterMessage}>
        Try adjusting the commit filter in Profiler settings.
      </div>
    </div>
  );
}
