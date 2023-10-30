import { IEntity } from './Entity.interface';
import { EntityCallback, EntityEvents, EntitySubscribers } from './Entity.types';


class Entity<CustomEvents extends EntityEvents> implements IEntity<CustomEvents> {
    private readonly _subscribers: EntitySubscribers<CustomEvents> = {
        init   : [],
        process: [],
    };

    protected _initialized: boolean = false;
    protected _process: boolean     = false;

    protected _execute<Event extends keyof CustomEvents> (event: Event): Promise<void> {
        return Promise.all(this._subscribers[event]).then();
    }

    protected constructor (subscribers?: EntitySubscribers<CustomEvents>) {
        this._subscribers = {
            ...this._subscribers,
            ...(subscribers ?? {}),
        };
    }

    public subscribe<Event extends keyof CustomEvents> (event: Event, callback: EntityCallback<CustomEvents[Event]>): void {
        if (!this._subscribers[event]) {
            this._subscribers[event] = [];
        }
        this._subscribers[event].push(callback);
    }

    public unsubscribe<Event extends keyof CustomEvents> (event: Event, callback: EntityCallback<CustomEvents[Event]>): void {
        if (this._subscribers[event]) {
            this._subscribers[event] = this._subscribers[event].filter((item) => item !== callback);
        }
    }
}