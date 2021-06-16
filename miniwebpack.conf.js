const plugin1 = require('./plugin1');

module.exports = {
    entry: './demo/main.js',
    output: {
        path: './build'
    },
    module: {
        rules: [
            
        ]
    },
    plugins: [
        new plugin1()
    ]
}