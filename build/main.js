(function(modules) {
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
                require(/Users/chenpeng/Desktop/work/single_code/mini-webpack/demo/main.js)
              })({
            "/Users/chenpeng/Desktop/work/single_code/mini-webpack/demo/main.js": 
                function(require, module, exports) {
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _com = _interopRequireDefault(require("./coms/com.js"));

var _utils = _interopRequireDefault(require("./coms/utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var func = function func() {
  (0, _com["default"])();
};

_utils["default"].load();

var _default = func;
exports["default"] = _default;
                }, 
            
            "/Users/chenpeng/Desktop/work/single_code/mini-webpack/demo/coms/com.js": 
                function(require, module, exports) {
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utils = _interopRequireDefault(require("./utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  var name = 'com.js';
  console.log(name);

  _utils["default"].load();
}
                }, 
            
            "/Users/chenpeng/Desktop/work/single_code/mini-webpack/demo/coms/utils.js": 
                function(require, module, exports) {
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function load() {
  console.log('load.js');
}

var _default = {
  load: load
};
exports["default"] = _default;
                }, 
            
            "/Users/chenpeng/Desktop/work/single_code/mini-webpack/demo/coms/utils.js": 
                function(require, module, exports) {
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function load() {
  console.log('load.js');
}

var _default = {
  load: load
};
exports["default"] = _default;
                }, 
            })