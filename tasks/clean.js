// npm i -D del

import { deleteAsync } from 'del'
import env from './env.js'

function clean () {
  return deleteAsync(env.outputFolder)
}

export default {
  all: clean
}
