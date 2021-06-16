
class Plugin1 {
    apply(compiler) {
        compiler.hooks.initialize.tap('initialize', () => {
            console.log('initialize emited');
        })
    }
}
module.exports = Plugin1;