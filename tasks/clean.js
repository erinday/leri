// npm i -D del
const { deleteAsync } = require('del')
const env = require('./env')

function clean () {
  return deleteAsync(env.outputFolder)
}

module.exports = {
  all: clean,
}
