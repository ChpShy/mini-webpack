const plugin1 = require('./plugins/test-plugin');
const babelLoader = require('./loaders/babel-loader');

module.exports = {
    entry: './demo/main.js',
    output: {
        path: './build'
    },
    module: {
        rules: [
            { 
                test: /\.js$/,
                use: [babelLoader]
            }
        ]
    },
    plugins: [
        new plugin1()
    ]
}