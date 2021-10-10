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
            let last = Array.prototype.slice.call(arguments, -1)[0];
            if (typeof last === 'function') {
                callback = last;
                args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            } else {
                args = arguments;
            }
        } else if (arguments.length) {
            args = Array.prototype.slice.call(arguments, 0);
        }
        let cbs = this.events;
        cbs.forEach(c => {
            c.callback(...args);
        });
        typeof callback === 'function' && callback();
    }
}
module.exports = EmitterWrapper;