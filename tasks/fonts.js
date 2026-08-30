const { series, src, dest } = require('gulp')
const env = require('./env')

function fonts () {
  return src('assets/fonts/*.*', { encoding: false })
    .pipe(dest(`${env.outputFolder}/statics/fonts`))
}

module.exports = {
  build: series(fonts)
}
