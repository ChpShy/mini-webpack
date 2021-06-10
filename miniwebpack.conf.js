const plugin1 = require('./plugin1');

module.exports = {
    entry: './demo/main.js',
    output: {
        filePath: './build',
        fileName: 'bundle.js'
    },
    module: {
        rules: [
            
        ]
    },
    plugins: [
        new plugin1()
    ]
}