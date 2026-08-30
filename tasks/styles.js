// npm i -D sass gulp-sass gulp-autoprefixer gulp-group-css-media-queries gulp-clean-css gulp-rename

import { src, dest, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoPrefixer from 'gulp-autoprefixer'
import gcmq from 'gulp-group-css-media-queries'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'

import env from './env.js'
import { BS } from './browserSync.js'

const sass = gulpSass(dartSass)

const path = {
  pages: 'assets/styles/pages/*.sass',
  watch: 'assets/styles/**/*.sass'
}

const suffix = `-${env.hash}`

const styles = function () {
  if (env.production) {
    return src(path.pages)
    .pipe(sass.sync({ silenceDeprecations: ['mixed-decls'] }))
    .pipe(autoPrefixer())
    .pipe(gcmq())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ suffix }))
    .pipe(dest(`${env.outputFolder}/statics/css`))
  }
  return src(path.pages)
  .pipe(sass.sync({ silenceDeprecations: ['mixed-decls'] }))
  .pipe(autoPrefixer())
  .pipe(gcmq())
  .pipe(cleanCSS({
    level: 2,
    format: 'beautify'
  }))
  .pipe(dest(`${env.outputFolder}/statics/css`))
  .on('end', () => BS.reload('*.css'))
}

export default {
  build: series(styles),
  path
}
