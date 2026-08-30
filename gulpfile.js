'use strict'
// npm i -D gulp cross-env

const gulp = require('gulp')
const clean = require('./tasks/clean')
// const copy = require('./tasks/copy')
const font = require('./tasks/fonts')
const view = require('./tasks/views')
const style = require('./tasks/styles')
// const script = require('./tasks/script')
const img = require('./tasks/images')
const hashing = require('./tasks/hashing')
const { runServe } = require('./tasks/browserSync')

gulp.task('watch', () => {
  gulp.watch(view.path.watch, gulp.series(view.build))
  gulp.watch(style.watch, gulp.series(style.build))
//   gulp.watch(script.path.watch, gulp.series(script.build))
  gulp.watch(img.path.watch, gulp.series(img.build))
})

gulp.task('build:dev', gulp.series(
  clean.all,
  font.build,
  style.build,
//   script.build,
  img.build,
  view.build
))

gulp.task('build', gulp.series(
  clean.all,
//   copy.other,
  font.build,
  style.build,
//   script.build,
  img.build,
  view.build,
  hashing.build
))

gulp.task('default', gulp.series(
  'build:dev', gulp.parallel('watch', runServe)
))
