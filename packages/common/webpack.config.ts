import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const config: webpack.Configuration[] = [
  {
    mode: 'none',
    name: 'glplotter-app-common',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
      plugins: [new TsconfigPathsPlugin({})],
    },
    devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
    entry: './src/index.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        type: 'commonjs',
      },
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
          test: /\.s(a|c)?ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // options...
              },
            },
          ],
        },
      ],
    },
    externals: {
      // Use external version of React
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDOM',
      },
    },
    plugins: [
      new webpack.IgnorePlugin({resourceRegExp: /.*\.js.map$/i}),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false,
      }),
    ],
    optimization: {
      minimize: isProd,
      minimizer: [new TerserPlugin()],
    },
    target: 'web',
  },
];

export default config;
