// npm i -D browser-sync
const browserSync = require('browser-sync').create()
const env = require('./env')

function runServe () {
  browserSync.init({
    server: {
      baseDir: env.outputFolder,
      index: "_site-map.html"
    }
  })
}

module.exports = {
  runServe,
  browserSync
}
