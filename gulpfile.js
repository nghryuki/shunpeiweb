const gulp = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')

/* js bundle */
gulp.task('bundlejs', bundlejs)
function bundlejs () {
  return gulp.src('./debug/_babel/main.es6')
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babe-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      }
    }, webpack))
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(gulp.dest('./debug/js/'))
}

/* js bundle for release */
gulp.task('bundlejsOut', bundlejsOut)
function bundlejsOut () {
  return gulp.src('./debug/_babel/main.es6')
    .pipe(webpackStream({
      mode: 'production',
      output: {
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babe-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      }
    }, webpack))
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(gulp.dest('./release/js/'))
}
