// npm i -D gulp-pug gulp-data gulp-plumber gulp-typograf gulp-rename gulp-htmlmin
const { src, dest, series } = require('gulp')
const pug = require('gulp-pug')
const data = require("gulp-data")
const plumber = require('gulp-plumber')
const typograf = require('gulp-typograf')
const htmlmin = require('gulp-htmlmin')
const rename = require('gulp-rename')

const env = require('./env')
const { browserSync } = require('./browserSync')

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
    PRODUCTION: env.production,
    VIEW: file.stem,
    URL: env.url,
  }
}

function views () {
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
  .pipe(pug({ pretty: true }))
  .pipe(typograf(typografConfig))
  .pipe(dest(env.outputFolder))
  .on('end', () => browserSync.reload())
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

module.exports = {
  build: env.production ? series(views, sitemap) : series(views),
  path
}

