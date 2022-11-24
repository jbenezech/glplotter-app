const Copy = require('copy-webpack-plugin');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const config = [
  {
    mode: 'none',
    name: 'glplotter-app-common',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json'),
          logLevel: 'INFO',
          baseUrl: path.resolve(__dirname, '.'),
        }),
      ],
    },
    devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
    entry: './src/App.tsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', {runtime: 'automatic'}],
              '@babel/typescript',
            ],
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    externals: {},
    plugins: [
      new Copy({
        patterns: [
          {
            from: './package.json',
            globOptions: {ignore: ['**/node_modules/**']},
            to: 'package.json',
          },
        ],
      }),
    ],
    target: 'web',
  },
];

module.exports = config;
