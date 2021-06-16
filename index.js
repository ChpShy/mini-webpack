const Compiler = require('./compiler');
const WebpackOptionsApply = require('./WebpackOptionsApply');

function normalizeOptions(options) {
    return {
        ...options,
        context: process.cwd(),
        plugins: options.plugins || []
    }
}

function miniWebpack(rawOptions, callback) {
    let options = normalizeOptions(rawOptions);
    options.context = process.cwd();
    let {plugins} = options;
    let compiler = new Compiler(options);
    new WebpackOptionsApply().process(options, compiler);
    // 注册插件
    plugins.forEach(plugin => {
        if (typeof plugin === 'function') {
            plugin.call(compiler, compiler);
        } else {
            plugin.apply(compiler);
        }
    });
    compiler.hooks.initialize.call();
    if (callback) {
        compiler.run((err, stats) => {
            compiler.close((err2) => {
                callback(err || err2, stats);
            });
        });
    }
    return compiler;
}

module.exports = miniWebpack;