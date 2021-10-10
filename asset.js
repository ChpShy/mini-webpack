let ID = 0 // 模块id自增初始值

class Asset {
  constructor(asset) {
    const { filePath, dependencies, _source } = asset || {}
    this.id = ID++ // 模块id
    this.filePath = filePath // 模块入口文件路径
    this.dependencies = dependencies // 模块依赖列表
    this._source = _source // code
  }
}

module.exports = Asset
