const js = require('@eslint/js')
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat()

module.exports = [
  js.configs.recommended,
  ...compat.config({
    extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
    },
  }),
]
