module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'semi': ['error', 'always'],
    'no-trailing-spaces': 'off',
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'camelcase': 'off',
    'indent': 'off',
    'vue/no-unused-vars': 'warning'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
