const Compiler = require('./compiler');

function normalizeOptions(options) {
    options.context = process.cwd();
    options.plugins = options.plugins || [];
}

function miniWebpack(options, callback) {
    normalizeOptions(options);
    let {plugins} = options;
    let compiler = new Compiler(options);
    // 注册插件
    plugins.forEach(plugin => {
        if (typeof plugin === 'function') {
            plugin.call(compiler, compiler);
        } else {
            plugin.apply(compiler);
        }
    });
    console.log(options.context);
    compiler.initialize.call();

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