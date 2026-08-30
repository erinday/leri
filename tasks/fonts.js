import { src, dest, series } from 'gulp'
import env from './env.js'

function fonts () {
  return src('assets/fonts/*.*', { encoding: false })
  .pipe(dest(`${env.outputFolder}/statics/fonts`))
}

export default {
  build: series(fonts)
}
