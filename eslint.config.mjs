import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { modules: true },
      },
      globals: {
        ...globals.node,
        ...globals.es2015,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
];
