/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type Store from 'proxact-devtools-shared/src/devtools/store';

import {getVersionedRenderImplementation} from './utils';

describe('profiling charts', () => {
  let React;
  let Scheduler;
  let store: Store;
  let utils;

  beforeEach(() => {
    utils = require('./utils');
    utils.beforeEachProfiling();

    store = global.store;
    store.collapseNodesByDefault = false;
    store.recordChangeDescriptions = true;

    React = require('proxact');
    Scheduler = require('scheduler');
  });

  const {render} = getVersionedRenderImplementation();

  function getFlamegraphChartData(rootID, commitIndex) {
    const commitTree = store.profilerStore.profilingCache.getCommitTree({
      commitIndex,
      rootID,
    });
    const chartData = store.profilerStore.profilingCache.getFlamegraphChartData(
      {
        commitIndex,
        commitTree,
        rootID,
      },
    );
    return {commitTree, chartData};
  }

  function getRankedChartData(rootID, commitIndex) {
    const commitTree = store.profilerStore.profilingCache.getCommitTree({
      commitIndex,
      rootID,
    });
    const chartData = store.profilerStore.profilingCache.getRankedChartData({
      commitIndex,
      commitTree,
      rootID,
    });
    return {commitTree, chartData};
  }

  describe('flamegraph chart', () => {
    // @proxactVersion >= 16.9
    it('should contain valid data', () => {
      const Parent = (_: {}) => {
        Scheduler.unstable_advanceTime(10);
        return (
          <React.Fragment>
            <Child key="first" duration={3} />
            <Child key="second" duration={2} />
            <Child key="third" duration={0} />
          </React.Fragment>
        );
      };

      // Memoize children to verify that chart doesn't include in the update.
      const Child = React.memo(function Child({duration}) {
        Scheduler.unstable_advanceTime(duration);
        return null;
      });

      utils.act(() => store.profilerStore.startProfiling());

      utils.act(() => render(<Parent />));
      expect(store).toMatchInlineSnapshot(`
        [root]
          ▾ <Parent>
              <Child key="first"> [Memo]
              <Child key="second"> [Memo]
              <Child key="third"> [Memo]
      `);

      utils.act(() => render(<Parent />));
      expect(store).toMatchInlineSnapshot(`
        [root]
          ▾ <Parent>
              <Child key="first"> [Memo]
              <Child key="second"> [Memo]
              <Child key="third"> [Memo]
      `);

      utils.act(() => store.profilerStore.stopProfiling());

      const rootID = store.roots[0];

      const firstCommitData = getFlamegraphChartData(rootID, 0);
      expect(firstCommitData.commitTree.nodes.size).toBe(5);
      expect(firstCommitData.chartData.rows).toMatchInlineSnapshot(`
        [
          [
            {
              "actualDuration": 15,
              "didRender": true,
              "id": 2,
              "label": "Parent (10ms of 15ms)",
              "name": "Parent",
              "offset": 0,
              "selfDuration": 10,
              "treeBaseDuration": 15,
            },
          ],
          [
            {
              "actualDuration": 0,
              "didRender": true,
              "id": 5,
              "label": "Child (Memo) key="third" (<0.1ms of <0.1ms)",
              "name": "Child",
              "offset": 15,
              "selfDuration": 0,
              "treeBaseDuration": 0,
            },
            {
              "actualDuration": 2,
              "didRender": true,
              "id": 4,
              "label": "Child (Memo) key="second" (2ms of 2ms)",
              "name": "Child",
              "offset": 13,
              "selfDuration": 2,
              "treeBaseDuration": 2,
            },
            {
              "actualDuration": 3,
              "didRender": true,
              "id": 3,
              "label": "Child (Memo) key="first" (3ms of 3ms)",
              "name": "Child",
              "offset": 10,
              "selfDuration": 3,
              "treeBaseDuration": 3,
            },
          ],
        ]
      `);

      const secondCommitData = getFlamegraphChartData(rootID, 1);
      expect(secondCommitData.commitTree.nodes.size).toBe(5);
      expect(secondCommitData.chartData.rows).toMatchInlineSnapshot(`
        [
          [
            {
              "actualDuration": 10,
              "didRender": true,
              "id": 2,
              "label": "Parent (10ms of 10ms)",
              "name": "Parent",
              "offset": 0,
              "selfDuration": 10,
              "treeBaseDuration": 15,
            },
          ],
          [
            {
              "actualDuration": 0,
              "didRender": false,
              "id": 5,
              "label": "Child (Memo) key="third"",
              "name": "Child",
              "offset": 15,
              "selfDuration": 0,
              "treeBaseDuration": 0,
            },
            {
              "actualDuration": 0,
              "didRender": false,
              "id": 4,
              "label": "Child (Memo) key="second"",
              "name": "Child",
              "offset": 13,
              "selfDuration": 0,
              "treeBaseDuration": 2,
            },
            {
              "actualDuration": 0,
              "didRender": false,
              "id": 3,
              "label": "Child (Memo) key="first"",
              "name": "Child",
              "offset": 10,
              "selfDuration": 0,
              "treeBaseDuration": 3,
            },
          ],
        ]
      `);
    });
  });

  describe('ranked chart', () => {
    // @proxactVersion >= 16.9
    it('should contain valid data', () => {
      const Parent = (_: {}) => {
        Scheduler.unstable_advanceTime(10);
        return (
          <React.Fragment>
            <Child key="first" duration={3} />
            <Child key="second" duration={2} />
            <Child key="third" duration={0} />
          </React.Fragment>
        );
      };

      // Memoize children to verify that chart doesn't include in the update.
      const Child = React.memo(function Child({duration}) {
        Scheduler.unstable_advanceTime(duration);
        return null;
      });

      utils.act(() => store.profilerStore.startProfiling());

      utils.act(() => render(<Parent />));
      expect(store).toMatchInlineSnapshot(`
        [root]
          ▾ <Parent>
              <Child key="first"> [Memo]
              <Child key="second"> [Memo]
              <Child key="third"> [Memo]
      `);

      utils.act(() => render(<Parent />));
      expect(store).toMatchInlineSnapshot(`
        [root]
          ▾ <Parent>
              <Child key="first"> [Memo]
              <Child key="second"> [Memo]
              <Child key="third"> [Memo]
      `);

      utils.act(() => store.profilerStore.stopProfiling());

      const rootID = store.roots[0];

      // Everything should render the first time.
      const firstCommitData = getRankedChartData(rootID, 0);
      expect(firstCommitData.commitTree.nodes.size).toBe(5);
      expect(firstCommitData.chartData.nodes).toMatchInlineSnapshot(`
        [
          {
            "id": 2,
            "label": "Parent (10ms)",
            "name": "Parent",
            "value": 10,
          },
          {
            "id": 3,
            "label": "Child (Memo) key="first" (3ms)",
            "name": "Child",
            "value": 3,
          },
          {
            "id": 4,
            "label": "Child (Memo) key="second" (2ms)",
            "name": "Child",
            "value": 2,
          },
          {
            "id": 5,
            "label": "Child (Memo) key="third" (<0.1ms)",
            "name": "Child",
            "value": 0,
          },
        ]
      `);

      // Only parent should render the second time, since child props have not changed.
      const secondCommitData = getRankedChartData(rootID, 1);
      expect(secondCommitData.commitTree.nodes.size).toBe(5);
      expect(secondCommitData.chartData.nodes).toMatchInlineSnapshot(`
        [
          {
            "id": 2,
            "label": "Parent (10ms)",
            "name": "Parent",
            "value": 10,
          },
        ]
      `);
    });
  });
});
