export type EntitySubscribers<Events> = {
    [Event in keyof Events]?: EntityCallback<Events[Event]>[];
}

export type EntityCallback<Data> = (data: Data) => any;

export type EntityEvents = {
    init: void;
    process: boolean;
}