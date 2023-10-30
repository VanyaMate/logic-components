import { IEntity } from './Entity.interface';
import {
    EntityCallback,
    EntityEvents,
    EntitySubscribers,
} from './Entity.types';


export default class Entity<Events> implements IEntity<EntityEvents<Events>> {
    private readonly _subscribers: EntitySubscribers<EntityEvents<Events>> = {
        init   : [],
        process: [],
    };

    protected _initialized: boolean = false;
    protected _process: boolean     = false;

    protected _execute<Event extends keyof EntityEvents<Events>> (event: Event, data: EntityEvents<Events>[Event]): Promise<void> {
        return Promise.all(this._subscribers[event].map((callback) => callback(data))).then();
    }

    public constructor (subscribers?: EntitySubscribers<EntityEvents<Events>>) {
        this._subscribers = {
            ...this._subscribers,
            ...(subscribers ?? {}),
        };
    }

    public subscribe<Event extends keyof EntityEvents<Events>> (event: Event, callback: EntityCallback<EntityEvents<Events>[Event]>): void {
        if (!this._subscribers[event]) {
            this._subscribers[event] = [];
        }
        this._subscribers[event].push(callback);
    }

    public unsubscribe<Event extends keyof EntityEvents<Events>> (event: Event, callback: EntityCallback<EntityEvents<Events>[Event]>): void {
        if (this._subscribers[event]) {
            this._subscribers[event] = this._subscribers[event].filter((item) => item !== callback);
        }
    }
}