const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'client', 'src');
const DIST_DIR = path.join(__dirname, 'client', 'public', 'dist');

const config = {
  devtool: 'inline-sourcemap',
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
      },
      {
        test: /\.(wav|mp3)$/i,
        loader: 'file?name=sounds/TR808/[name].[ext]'
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = config;
