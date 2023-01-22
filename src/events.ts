import { EventConfig, EventHandler, IEvent } from "abstractions/events";
import { executeForEach } from "helpers/array";

export class Event<T = unknown> implements IEvent<T> {
    private readonly _name: string;
    private readonly _maxListeners: number;

    private _handlers: EventHandler<T>[] = [];

    constructor (config: EventConfig) {
        this._name = config.name;

        this._maxListeners = config.maxListeners || 10;
    }

    public on(handler: EventHandler<T>) {
        if (this._handlers.includes(handler) || this._handlers.length >= this._maxListeners) {
            console.warn(`Event "${this._name}" has max number of handlers. Adding skipped`);
            return null;
        }

        this._handlers.push(handler);

        return () => this.off(handler);
    }

    public off(handler: EventHandler<T>) {
        if (!this._handlers.includes(handler)) {
            return;
        }

        this._handlers = this._handlers.filter(h => h !== handler);
    }

    public async trigger(data?: T) {
        if (!this._handlers.length) {
            return;
        }

        const copiedHandlers = Array.from(this._handlers);

        await executeForEach(copiedHandlers, async (cb) => {
            try {
                await cb(data);
            } catch (err) {
                console.error(`Event "${this._name}" has error in handler`, err);
            }
        });
    }
}
