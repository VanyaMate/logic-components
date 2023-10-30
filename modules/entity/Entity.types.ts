export type EntitySubscribers<Events> = {
    [Event in keyof Events]?: EntityCallback<Events[Event]>[];
}

export type EntityCallback<Data> = (data: Data) => any;

export type EntityDefaultEvents = {
    init: void;
    process: boolean;
}

export type EntityEvents<CustomEvents> = CustomEvents & EntityDefaultEvents;