import type {Linter} from 'eslint';
import * as proxactHooks from 'eslint-plugin-proxact-hooks';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  proxactHooks.configs['recommended'],
  {
    rules: {
      'proxact-hooks/exhaustive-deps': 'error',
    },
  },
] satisfies Linter.Config[];
