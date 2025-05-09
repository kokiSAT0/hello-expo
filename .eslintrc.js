/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'prettier', // Prettier と競合するルールを無効化
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'prettier/prettier': 'error', // Prettier 逸脱は ESLint エラー扱い
    'react/react-in-jsx-scope': 'off', // React 17 以降は不要
    '@typescript-eslint/no-require-imports': 'warn', // require の使用を警告
  },
  env: {
    jest: true, // Jest のグローバル変数を使用可能にする
    node: true, // Node.js のグローバル変数を使用可能にする
    browser: true, // ブラウザのグローバル変数を使用可能にする
  },
};
