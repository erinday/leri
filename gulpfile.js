// yarn add cross-env
// yarn add -D gulp
'use strict'

import gulp from 'gulp'
import clean from './tasks/clean.js'
import fonts from './tasks/fonts.js'
import views from './tasks/views.js'
import styles from './tasks/styles.js'
// import scripts from './tasks/scripts.js'
import images from './tasks/images.js'
// const copy = require('./tasks/copy')
import { runServe } from './tasks/browserSync.js'

gulp.task('watch', () => {
  gulp.watch(views.path.watch, gulp.series(views.build))
  gulp.watch(styles.path.watch, gulp.series(styles.build))
  // gulp.watch(scripts.path.watch, gulp.series(scripts.build))
  gulp.watch(images.path.watch, gulp.series(images.build))
})

gulp.task('dev', gulp.series(
  clean.all,
  fonts.build,
  styles.build,
  // scripts.build,
  images.build,
  views.build,
))

gulp.task('build', gulp.series(
  clean.all,
  fonts.build,
  styles.build,
  // scripts.build,
  images.build,
  // copy.build,
  views.build
))

gulp.task('default', gulp.series('dev', gulp.parallel('watch', runServe)))
