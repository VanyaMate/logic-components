export type EntitySubscribers<Events> = {
    [Event in keyof Events]?: EntityCallback<Events[Event]>[];
}

export type EntityCallback<DataType> = (data?: DataType) => any;

export type EntityDefaultEvents = {
    init: void;
    process: boolean;
}

export type EntityEvents<CustomEvents> = CustomEvents & EntityDefaultEvents;