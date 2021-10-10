const EntryOptions = require('./EntryOptions');
class WebpackOptionsApply {
    process(options, compiler) {
        compiler.outputPath = options.output.path;
        compiler.name = options.name;
        new EntryOptions().apply(compiler);
        compiler.hooks.entryOption.call(options.context, options.entry);
    }
}

module.exports = WebpackOptionsApply;