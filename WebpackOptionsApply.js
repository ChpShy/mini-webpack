class WebpackOptionsApply {
    process(options, compiler) {
        compiler.outputPath = options.output.path;
        compiler.name = options.name;
    }
}

module.exports = WebpackOptionsApply;