const fs = require('fs');
const path = require('path');
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
            beforeCompile: new Emitter('beforeCompile'),
            compile: new Emitter('compile'),
            afterCompile: new Emitter('afterCompile'),
            shutdown: new Emitter('shutdown'),
            entryOption: new Emitter('entryOption'),
            make: new Emitter('make'),
            finishMake: new Emitter('finishMake'),
            emit: new Emitter('emit'),
        }
    }
    
    compile(callback) {
        this.hooks.beforeCompile.call({}, (err) => {
            if (err) return callback(err);
            this.hooks.compile.call();

			const compilation = new Compilation(this);
            this.hooks.make.call(compilation, (err) => {
                if (err) return callback(err);
                this.hooks.finishMake.call(compilation, err => {
					if (err) return callback(err);

					process.nextTick(() => {
						compilation.finish(err => {
							if (err) return callback(err);

							compilation.seal(err => {
								if (err) return callback(err);

								this.hooks.afterCompile.call(compilation, err => {
									if (err) return callback(err);

									return callback(null, compilation);
								});
							});
						});
					});
				});
            })
        })
    }

    run(callback) {
        const onCompiled = (compilation) => {
            this.hooks.emit.call(compilation);
            // 编译完成之后，生成文件夹
            if (!fs.existsSync(this.outputPath)) {
                fs.mkdirSync(this.outputPath);
            }
            // 写入文件
            const assets = compilation.assets;
            for (let p in assets) {
                fs.writeFileSync(p, assets[p]);
            }
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