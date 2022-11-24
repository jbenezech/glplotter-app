module.exports = {
  extends: '../../.eslintrc.js',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
