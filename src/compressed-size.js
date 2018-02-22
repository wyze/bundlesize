const gzip = require('gzip-size')
const iltorb = require('iltorb')

const getCompressedSize = (data, compression = 'gzip') => {
  let size
  switch (compression) {
    case 'gzip':
      size = gzip.sync(data)
      break
    case 'brotli':
      size = iltorb.compressSync(new Buffer(data, 'utf8')).length
      break
    case 'none':
    default:
      size = Buffer.byteLength(data)
  }

  return size
}

module.exports = getCompressedSize
