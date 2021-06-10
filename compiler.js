const Emitter = require('./emitter.js');
const Compilation = require('./compilation');
class Compiler {
    constructor(options) {
        this.initialize = new Emitter('initialize');
        this.beforeRun = new Emitter('beforeRun');
        this.afterCompile = new Emitter('afterCompile');
    }
    
    compile(callback) {
        const compilation = new Compilation(this);
        this.afterCompile.call(compilation, (err) => {
            if (err) return callback(err);
            return callback(null, compilation);
        })
    }

    run(callback) {
        const run = () => {
            this.beforeRun.call(this, (err) => {
                this.run.call(this, () => {
                    this.compile(callback);
                });
            });
        }

        run();
    }

    close() {
        this.emit('shutdown');
    }
}

module.exports = Compiler;