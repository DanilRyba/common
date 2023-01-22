import { EventConfig, EventHandler, IEvent } from "abstractions/events";
export declare class Event<T = unknown> implements IEvent<T> {
    private readonly _name;
    private readonly _maxListeners;
    private _handlers;
    constructor(config: EventConfig);
    on(handler: EventHandler<T>): () => void;
    off(handler: EventHandler<T>): void;
    trigger(data?: T): Promise<void>;
}
//# sourceMappingURL=events.d.ts.map