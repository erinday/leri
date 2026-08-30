// npm i -D browser-sync

import browserSync from 'browser-sync'

export const BS = browserSync.create()

export function runServe () {
  BS.init({
    server: {
      baseDir: 'dev',
      index: "_site-map.html"
    }
  })
}
