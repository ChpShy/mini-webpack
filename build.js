const miniWebpack = require('./index');
const options = require('./miniwebpack.conf');

let compiler = miniWebpack(options, () => {
    console.log('build done');
});