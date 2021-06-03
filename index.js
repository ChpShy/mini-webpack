const Emitter = require('./emitter.js');
console.log(Emitter)
class MiniWebpack extends Emitter {
    constructor(options) {
        super();
    }
}

module.exports = function (options) {
    return new MiniWebpack(options);
};