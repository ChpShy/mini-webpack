const rimraf = require('rimraf')

class CleanPlugin {

  apply(compiler) {
    compiler.hooks.emit.tap('clean', (compilation) => {
      rimraf.sync(compilation.options.output.path)
    })
  }
}

module.exports = CleanPlugin
