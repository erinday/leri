const production = process.env.NODE_ENV === 'production'

module.exports = {
  production,
  outputFolder: production ? 'dist' : 'dev',
  url: '',
  domain: ''
}
