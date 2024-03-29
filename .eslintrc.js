module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    worker: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: '18.0',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:react/jsx-runtime',
    'plugin:jest/recommended',
  ],
  rules: {
    'no-unsafe-optional-chaining': ['error'],
    'no-await-in-loop': ['error'],
    'no-template-curly-in-string': ['error'],
    'no-unreachable-loop': ['error'],
    'block-scoped-var': ['error'],
    'default-case': ['error'],
    'default-case-last': ['error'],
    camelcase: ['error'],
    'comma-style': ['error'],
    'id-length': [
      'error',
      {
        min: 3,
        exceptions: [
          't',
          'fr',
          'en',
          'xs',
          'sm',
          'md',
          'lg',
          'xl',
          'id',
          'x',
          'y',
          'z',
          'q',
          'h1',
          'h2',
          'h3',
          'h4',
          'ul',
          '_',
          'ns',
          'to',
          'vi',
        ],
      },
    ],
    'no-unneeded-ternary': [1],
    'semi-style': [1, 'last'],
    'space-in-parens': [1, 'never'],
    'switch-colon-spacing': [1, {after: true, before: false}],
    '@typescript-eslint/array-type': [2],
    '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
    '@typescript-eslint/explicit-function-return-type': [2],
    '@typescript-eslint/no-require-imports': [2],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': [2],
    '@typescript-eslint/no-unnecessary-condition': [2],
    '@typescript-eslint/promise-function-async': [2],
    '@typescript-eslint/no-empty-function': [1],
    // semicolons
    semi: 'off',
    '@typescript-eslint/semi': [2, 'always', {omitLastInOneLineBlock: true}],
    '@typescript-eslint/member-delimiter-style': [2],
    // quotes
    quotes: 'off',
    '@typescript-eslint/quotes': [2, 'single'],
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': [
      1,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': [1],
    'require-await': 'off',
    '@typescript-eslint/require-await': [2],
    'react/boolean-prop-naming': [
      2,
      {rule: '^(is|has|can)[A-Z]([A-Za-z0-9]?)+'},
    ],
    'react/button-has-type': [2],
    'react/no-array-index-key': [2],
    'react/no-multi-comp': [2, {ignoreStateless: true}],
    'react/no-typos': [1],
    'react/prefer-stateless-function': [2],
    'react/self-closing-comp': [1],
    'react/style-prop-object': [2],
    'react/void-dom-elements-no-children': [2],
    'react/jsx-equals-spacing': [2],
    'react/jsx-curly-spacing': [2],
    'react/jsx-handler-names': [1],
    'react/jsx-no-undef': [2],
    'react/jsx-no-useless-fragment': [1],
    'react/jsx-pascal-case': [2],
    'react/jsx-wrap-multilines': [2],
  },
};
