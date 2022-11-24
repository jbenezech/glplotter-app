const CracoAlias = require('craco-alias');
const path = require('path');
const fs = require('fs');

const rewireBabelLoader = require('craco-babel-loader');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  eslint: {
    enable: false,
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: '../common/',
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: '../common/tsconfig.paths.json',
      },
    },
    {
      plugin: rewireBabelLoader,
      options: {
        includes: [resolveApp('src'), resolveApp('../common/src')],
      },
    },
  ],
};
