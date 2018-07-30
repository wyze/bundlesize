const readPkgUp = require('read-pkg-up')

const pkg = readPkgUp.sync().pkg
const program = require('commander')
const { error } = require('prettycli')
const debug = require('./debug')

/* Config from package.json */
const packageJSONConfig = pkg.bundlesize

/* Config from CLI */

program
  .option('-n, --name [name]', 'custom name for a file (lib.min.js)')
  .option('-f, --files [files]', 'files to test against (dist/*.js)')
  .option('-s, --max-size [maxSize]', 'maximum size threshold (3Kb)')
  .option('-b, --branch [branch]', 'base branch for comparison')
  .option('--debug', 'run in debug mode')
  .option('-c, --compression [compression]', 'specify which compression algorithm to use')
  .parse(process.argv)

let cliConfig = {}

if (program.files) {
  cliConfig = Object.assign(
    {},
    {
      files: [
        {
          path: program.files,
          maxSize: program.maxSize,
          compression: program.compression || 'gzip'
        }
      ]
    }
  )
}

if (program.branch) {
  cliConfig = Object.assign({}, cliConfig, { baseBranch: program.branch })
}

/* Send to readme if no configuration is provided */

if (!packageJSONConfig && !cliConfig) {
  error(
    `Config not found.

    You can read about the configuration options here:
    https://github.com/siddharthkp/bundlesize#configuration
  `,
    { silent: true }
  )
}

const config = Object.assign({}, { files: [], baseBranch: 'master' }, cliConfig, packageJSONConfig)

debug('cli config', cliConfig)
debug('package json config', packageJSONConfig)
debug('selected config', config)

module.exports = config
