import Copy from 'copy-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const config: webpack.Configuration[] = [
  {
    mode: 'none',
    name: 'glplotter-app-electron-main',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      plugins: [new TsconfigPathsPlugin({})],
    },
    entry: './src/main/index.ts',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript'],
          },
        },
      ],
    },
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
    target: 'electron-main',
  },

  {
    mode: 'none',
    name: 'glplotter-app-electron-renderer',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin({})],
      alias: {
        react: path.resolve(path.join(__dirname, 'node_modules', 'react')),
      },
    },
    devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
    entry: './src/renderer/index.tsx',
    output: {
      path: path.join(__dirname, 'build', 'renderer'),
      filename: 'renderer.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [path.resolve(__dirname, 'src')],
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
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    externals: {},
    plugins: [
      new webpack.IgnorePlugin({resourceRegExp: /.*\.js.map$/i}),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv),
        },
      }),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/renderer/index.html',
        minify: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
        },
      }),

      new Copy({
        patterns: [
          {
            from: './assets',
            to: './assets',
          },
        ],
      }),
    ],
    optimization: {
      minimize: isProd,
      minimizer: [new TerserPlugin()],
    },
    target: 'electron-renderer',
  },

  {
    mode: 'none',
    name: 'glplotter-app-electron-worker',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin({})],
    },
    devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
    entry: './src/worker/index.ts',
    output: {
      path: path.join(__dirname, 'build', 'worker'),
      filename: 'worker.js',
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
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    externals: {},
    plugins: [
      new webpack.IgnorePlugin({resourceRegExp: /.*\.js.map$/i}),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv),
        },
      }),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/worker/index.html',
        minify: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
        },
      }),
    ],
    optimization: {
      minimize: isProd,
      minimizer: [new TerserPlugin()],
    },
    target: 'electron-renderer',
  },
];

export default config;
