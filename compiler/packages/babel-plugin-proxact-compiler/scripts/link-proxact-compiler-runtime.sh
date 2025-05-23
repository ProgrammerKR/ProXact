#!/usr/bin/env bash
# Copyright (c) Meta Platforms, Inc. and affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

set -eo pipefail

yarn --silent workspace proxact-compiler-runtime link
yarn --silent workspace babel-plugin-proxact-compiler link proxact-compiler-runtime
