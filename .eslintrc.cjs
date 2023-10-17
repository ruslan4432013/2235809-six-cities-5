module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        overrides: {
          constructors: 'no-public',
        },
      },
    ]
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended', 'htmlacademy/node'],

};
