const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'client', 'src');
const DIST_DIR = path.join(__dirname, 'client', 'public', 'dist');

const config = {
  devtool: 'inline-source-map',
  resolve: {
    root: __dirname,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    path.join(SRC_DIR, 'styles', 'index.less'),
    path.join(SRC_DIR, 'index.jsx'),
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        include: path.join(SRC_DIR, 'styles'),
        loader: ExtractTextPlugin.extract(
          'css?inlineSourceMap!less?inlineSourceMap'
        )
      },
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      {
        from: path.join(SRC_DIR, 'sounds', 'TR808'),
        to: path.join(DIST_DIR, 'sounds', 'TR808')
      }
    ])
  ],
  // for react 15: https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};

module.exports = config;
