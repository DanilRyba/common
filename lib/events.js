"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const array_1 = require("helpers/array");
class Event {
    constructor(config) {
        this._handlers = [];
        this._name = config.name;
        this._maxListeners = config.maxListeners || 10;
    }
    on(handler) {
        if (this._handlers.includes(handler) || this._handlers.length >= this._maxListeners) {
            console.warn(`Event "${this._name}" has max number of handlers. Adding skipped`);
            return null;
        }
        this._handlers.push(handler);
        return () => this.off(handler);
    }
    off(handler) {
        if (!this._handlers.includes(handler)) {
            return;
        }
        this._handlers = this._handlers.filter(h => h !== handler);
    }
    async trigger(data) {
        if (!this._handlers.length) {
            return;
        }
        const copiedHandlers = Array.from(this._handlers);
        await (0, array_1.executeForEach)(copiedHandlers, async (cb) => {
            try {
                await cb(data);
            }
            catch (err) {
                console.error(`Event "${this._name}" has error in handler`, err);
            }
        });
    }
}
exports.Event = Event;
//# sourceMappingURL=events.js.map