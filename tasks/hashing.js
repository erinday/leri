// npm i -D gulp-rev-all gulp-rev-delete-original
const env = require('./env')
const RevAll = require('gulp-rev-all');
const revDeleteOriginal = require('gulp-rev-delete-original');
const { series, src, dest } = require('gulp')

function hashing () {
  return src(`${env.outputFolder}/**/*.{html,css,js,png,jpg,svg,webp}`, { encoding: false })
  .pipe(RevAll.revision({
    dontRenameFile: ['.html'],
    includeFilesInManifest: []
  }))
  .pipe(revDeleteOriginal())
  .pipe(dest('dist'));
}

module.exports = {
  build: series(hashing),
}
