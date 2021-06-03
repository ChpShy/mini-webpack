class EmitterWrapper {
    constructor() {
        this.events = {};
    }
    plugin(e, callback) {
        if (this.events[e]) {
            this.events[e].push(callback);
        } else {
            this.events[e] = [callback];
        }
    }
    flush(e, ...args) {
        let cbs = this.events[e];
        if (cbs) {
            cbs.forEach(cb => {
                cb(...args);
            })
        }
    }
}
module.exports = EmitterWrapper;
// module.export = EmitterWrapper;