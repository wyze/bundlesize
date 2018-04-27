const assets = require('./webpack-display-names')

const transform = ({ displayName, path }) => {
  const transformed = path.replace(/^\.\/dist\/js\/([^\.]+)\.\w+\.js$/, '$1')

  return displayName || assets[transformed] || transformed
}

module.exports = transform
