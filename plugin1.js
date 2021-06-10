
class Plugin1 {
    apply(compiler) {
        compiler.initialize.tap('initialize', () => {
            console.log('initialize emited');
        })
    }
}
module.exports = Plugin1;