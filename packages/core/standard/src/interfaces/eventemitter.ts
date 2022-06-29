/** @internal */
export type ValidEventTypes = string | symbol | object;

/** @internal */
export type EventNames<T extends ValidEventTypes> = T extends string | symbol
    ? T
    : keyof T;

/** @internal */
export type ArgumentMap<T extends object> = {
    [K in keyof T]: T[K] extends (...args: any[]) => void
        ? Parameters<T[K]>
        : T[K] extends any[]
            ? T[K]
            : any[];
};

/** @internal */
export type EventListener<T extends ValidEventTypes,
    K extends EventNames<T>> = T extends string | symbol
    ? (...args: any[]) => void
    : (
        ...args: ArgumentMap<Exclude<T, string | symbol>>[Extract<K, keyof T>]
    ) => void;

/** @internal */
export interface EventEmitter<EventTypes extends ValidEventTypes = string | symbol, Context extends any = any> {
    /**
     * Add a listener for a given event.
     */
    on<T extends EventNames<EventTypes>>(
        event: T,
        fn: EventListener<EventTypes, T>,
        context?: Context
    ): this;
    addListener<T extends EventNames<EventTypes>>(
        event: T,
        fn: EventListener<EventTypes, T>,
        context?: Context
    ): this;

    /**
     * Add a one-time listener for a given event.
     */
    once<T extends EventNames<EventTypes>>(
        event: T,
        fn: EventListener<EventTypes, T>,
        context?: Context
    ): this;

    /**
     * Remove the listeners of a given event.
     */
    removeListener<T extends EventNames<EventTypes>>(
        event: T,
        fn?: EventListener<EventTypes, T>,
        context?: Context,
        once?: boolean
    ): this;
    off<T extends EventNames<EventTypes>>(
        event: T,
        fn?: EventListener<EventTypes, T>,
        context?: Context,
        once?: boolean
    ): this;
}
