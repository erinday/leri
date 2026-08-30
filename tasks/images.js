// npm i -D gulp-newer gulp-svgmin

import { src, dest, series } from 'gulp'
import newer from 'gulp-newer'
import svgmin from 'gulp-svgmin'
import env from './env.js'
import { BS } from './browserSync.js'

const path = {
  svg: 'assets/images/**/*.svg',
  other: 'assets/images/**/*.{png,jpg,ico,webp}',
  watch: 'assets/images/**/*.{png,jpg,svg,ico,webp}',
  favicon: 'assets/images/favicon/favicon.ico'
}

function img () {
  return src(path.other, { encoding: false })
    .pipe(newer(`${env.outputFolder}/statics/img`))
    .pipe(dest(`${env.outputFolder}/statics/img`))
}

function svg () {
  return src(path.svg, { encoding: false })
    .pipe(newer(`${env.outputFolder}/statics/img`))
    .pipe(svgmin())
    .pipe(dest(`${env.outputFolder}/statics/img`))
}

function favicon () {
  return src(path.favicon, { encoding: false })
    .pipe(dest(`${env.outputFolder}/`))
    .on('end', BS.reload)
}

export default {
  build: series(img, svg, favicon),
  path
}
