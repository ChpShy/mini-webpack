class EntryOptions {
  constructor() {
    this.context = '';
    this.entry = '';
  }
  apply(compiler) {
    compiler.hooks.entryOption.tap('entryOption', (context, entry) => {
      this.context = context;
      this.entry = entry;
    })
    compiler.hooks.make.tap('entryOption', (compilation, callback) => {
      const { context, entry } = this;
      compilation.addEntry(context, entry, (err) => {
        callback();
      });
    })
  }
}

module.exports = EntryOptions;