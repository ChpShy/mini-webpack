class EmitterWrapper {
    constructor(name) {
        this.name = name;
        this.events = [];
    }
    tap(name, callback) {
        this.events.push({
            name,
            callback
        });
    }
    call() {
        let callback = null;
        let args = [];
        if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            callback = Array.prototype.slice.call(arguments, -1)[0];
        } else if (arguments.length) {
            args = Array.prototype.slice.call(arguments, 0);
        }
        let cbs = this.events;
        cbs.forEach(c => {
            c.callback(...args);
        });
        callback && callback();
    }
}
module.exports = EmitterWrapper;