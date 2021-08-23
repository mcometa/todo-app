const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.production')

module.exports = () => {
  // merge default configuration with a chosen mode configuration
  return process.env.NODE_ENV === 'development' ? devConfig : prodConfig
}
