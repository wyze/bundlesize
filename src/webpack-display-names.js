const path = require('path')
const readPkgUp = require('read-pkg-up')

let assets = {}

try {
  const dir = path.dirname(readPkgUp.sync().path)
  const stats = require(path.resolve(dir, 'stats.json'))

  assets = Object.entries(stats.children[0].assetsByChunkName).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [value.replace(/^js\/(\d+)\..+\.js$/, '$1')]: key
    }),
    {}
  )
} catch (ex) {}

module.exports = assets
