export interface IEvent<T = unknown> {
    on(handler: EventHandler): (() => void) | null;
    off(handler: EventHandler): void;
    trigger(data?: T): void;
}
export type EventConfig = {
    name: string;
    maxListeners?: number;
};
export type EventHandler<T = unknown> = (data?: T) => void | Promise<void>;
//# sourceMappingURL=events.d.ts.map