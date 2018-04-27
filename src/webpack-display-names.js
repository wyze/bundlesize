const path = require('path')
const readPkgUp = require('read-pkg-up')

let assets = {}

try {
  const dir = path.dirname(readPkgUp.sync().path)
  const stats = require(path.resolve(dir, 'stats.json'))

  assets = stats.children[0].assets
    .filter(asset => asset.name.endsWith('.js'))
    .reduce(
      (acc, asset) => ({
        ...acc,
        [asset.chunks.pop()]: asset.chunkNames.pop()
      }),
      {}
    )
} catch (ex) {}

module.exports = assets
