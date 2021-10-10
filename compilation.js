const Emitter = require('./emitter.js');
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const Asset = require('./asset');
class Compilation {
    constructor(compiler) {
        this.compiler = compiler;
        this.options = compiler.options;
        this._modules = new Map();
        this.graph = [];
        this.entry = '';
        this.hooks = {
            finish: new Emitter('finish'),
            seal: new Emitter('seal'),
            finishModules: new Emitter('finishModules'),
        }
        this.assets = {};
    }
    addEntry(context, entry, callback) {
        const filePath = path.join(context, entry);
        this.entry = filePath;
        this.createModuleTree();
    }
    createModule(filePath) {
        // 已编译的模块不再编译
        if (this._modules.get(filePath)) {
            return this._modules.get(filePath);
        }
        let _source = fs.readFileSync(filePath, 'utf-8');
        // 匹配loader
        const rules = this.options.module.rules;
        const dependencies = [];
        // 执行解析依赖
        const ast = parser.parse(_source, {
            sourceType: 'module'//babel官方规定必须加这个参数，不然无法识别ES Module
        })
        traverse(ast, {
            ImportDeclaration({node}){
                const dirname = path.dirname(filePath);
                const newFile = path.join(dirname, node.source.value);
                dependencies.push(newFile);
            }
        })
        for (const rule of rules) {
            if (rule.test.test(filePath)) {
                const loaders = rule.use;
                // 从后往前执行loader
                for (let i = loaders.length - 1; i >= 0; i--) {
                    _source = loaders[i](_source);
                }
            }
        }
        const module = {
            filePath,
            _source,
            dependencies
        };
        // 依赖
        this._modules.set(filePath, module);
        return module;
    }
    createModuleTree() {
        const entryModule = this.createModule(this.entry);
        const graph = [entryModule];
        for (let i = 0; i < graph.length; i++) {
            const module = graph[i];
            const dependencies = module.dependencies;
            for (let i = 0; i < dependencies.length; i++) {
                graph.push(this.createModule(dependencies[i]));
            }
        }
        this.graph = graph;
    }
    finish(callback) {
        // 上报依赖警告和错误
        this.hooks.finishModules.call(this._modules);
        callback();
    }
    seal(callback) {
        // 生成chunk
        const output = path.join(__dirname, this.options.output.path, './main.js');
        let modules = '{'
        this.graph.forEach(({
            filePath,
            _source
        }) => {
            modules += `
            "${filePath}": 
                function(require, module, exports) {
                    ${_source}
                }, 
            `
        })
        modules += '}'
        this.assets = {
            [output]: `(function(modules) {
                // 注意，这里require方法是require一个id, 但是我们已经知道了path -> id的映射关系
                function require(id) {
                  var currentModule = modules[id]
                  var fn = currentModule[0]
                  var mapping = currentModule[1]
          
                  // 内部require方法
                  function innerRequire(path) {
                    return require(mapping[path]) // 调用require方法
                  }
          
                  var module = { exports: {} }
          
                  fn(innerRequire, module, module.exports)
          
                  return module.exports
                }
          
                // 入口文件id必定为0
                require(${this.graph[0].filePath})
              })(${modules})`
        };
        callback(this);
    }
}

module.exports = Compilation;