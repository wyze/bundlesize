const transform = path =>
  path.replace(/^\.\/dist\/js\/([^\.]+)\.\w+\.js$/, '$1')

module.exports = transform
