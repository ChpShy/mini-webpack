const miniWebpack = require('./index');

let mw = miniWebpack({});

mw.plugin('event', (...args) => {
    console.log(...args);
});

mw.flush('event', '1', '2', '3');