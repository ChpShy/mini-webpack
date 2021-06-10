const Emitter = require('./emitter.js');

class Compiler {
    constructor(options) {
        this.initialize = new Emitter('initialize');
    }
    run(callback) {
        const run = () => {
            this.emit('beforeRun', () => {
                this.emit('run', () => {

                });
            });
        }
    }

    close() {
        this.emit('shutdown');
    }
}

module.exports = Compiler;