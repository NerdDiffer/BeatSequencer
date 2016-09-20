// https://github.com/lelandrichardson/enzyme-example-karma-webpack/blob/master/karma.conf.js

const path = require('path');
const webpackConfig = require('./webpack.config.js');
const GLOBS = {
  SRC: 'client/src/**/*.js',
  TEST: {
    ALL: 'test/**/*.js',
    COMPONENTS: 'test/components/*.js',
    SOUNDS: 'test/sounds/*.js'
  }
};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      GLOBS.TEST.SOUNDS
    ],
    exclude: [
      // path.resolve(__dirname, 'node_modules')
    ],

    preprocessors: {
      [GLOBS.SRC]: ['webpack', 'sourcemap'],
      [GLOBS.TEST.SOUNDS]: ['webpack', 'sourcemap']
    },

    // webpack may need to be *outside* of preprocessors
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  })
};
