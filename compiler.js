const fs = require('fs');
const path = require('path');
const bundle = require('./bundle');
const Emitter = require('./emitter.js');
const Compilation = require('./compilation');
class Compiler {
    constructor(options) {
        this.options = options;
        this.outputPath = '';
        this.hooks = {
            initialize: new Emitter('initialize'),
            beforeRun: new Emitter('beforeRun'),
            run: new Emitter('run'),
            afterCompile: new Emitter('afterCompile'),
            shutdown: new Emitter('shutdown')
        }
    }
    
    compile(callback) {
        const compilation = new Compilation(this);
        this.hooks.afterCompile.call(compilation, (err) => {
            if (err) return callback(err);
            return callback(null, compilation);
        })
    }

    run(callback) {
        const onCompiled = () => {
            // 编译完成之后，生成文件
            if (!fs.existsSync(this.outputPath)) {
                fs.mkdirSync(this.outputPath);
            }
            fs.writeFileSync(path.join(this.outputPath, 'main.js'), '222');
            callback();
        }
        const run = () => {
            this.hooks.beforeRun.call(this, (err) => {
                this.hooks.run.call(this, () => {
                    this.compile(onCompiled);
                });
            });
        }
        run();
    }

    close() {
        // this.hooks.shutdown.call();
    }
}

module.exports = Compiler;