// npm -D gulp-pug gulp-data gulp-plumber gulp-typograf gulp-htmlmin gulp-rename
import { src, dest, series } from 'gulp'
import pug from 'gulp-pug'
import data from 'gulp-data'
import plumber from 'gulp-plumber'
import typograf from 'gulp-typograf'
import htmlmin from 'gulp-htmlmin'
import rename from 'gulp-rename'

import env from './env.js'
import { BS } from './browserSync.js'

const path = {
  pages: 'assets/views/pages/**/*.pug',
  error: 'assets/views/pages/404.pug',
  siteMap: 'assets/views/pages/_site-map.pug',
  watch: 'assets/views/**/*.pug',
}

const typografConfig = {
  locale: ['ru', 'en-US'],
  safeTags: [
    ['<head>', '</head>']
  ]
}

const htmlminConfig = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  minifyJS: true,
  minifyCSS: true,
  removeComments: true
}

function dataView (file) {
  return {
    VIEW: file.stem,
    PRODUCTION: env.production,
    HASH: env.hash,
    URL: env.url,
  }
}

function view () {
  if (env.production) {
    return src(path.pages, { ignore: [path.siteMap] })
    .pipe(plumber())
    .pipe(data(dataView))
    .pipe(pug())
    .pipe(htmlmin(htmlminConfig))
    .pipe(typograf(typografConfig))
    .pipe(dest(env.outputFolder))
  }
  return src(path.pages)
  .pipe(plumber())
  .pipe(data(dataView))
  .pipe(pug())
  .pipe(typograf(typografConfig))
  .pipe(dest(env.outputFolder))
  .on('end', BS.reload)
}

function sitemap () {
  return src(path.siteMap)
  .pipe(plumber())
  .pipe(data(dataView))
  .pipe(pug())
  .pipe(rename({
    basename: 'sitemap',
    extname: ".xml"
  }))
  .pipe(dest(env.outputFolder))
}

export default {
  build: env.production ? series(view, sitemap): series(view),
  path
}
