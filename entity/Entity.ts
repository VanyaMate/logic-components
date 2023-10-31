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
        if (this._subscribers[event]) {
            return Promise.all(this._subscribers[event]!.map((callback) => callback(data))).then();
        }
        return Promise.resolve();
    }

    protected _executeInit (): Promise<void> {
        this._initialized = true;
        return this._execute('init', null as EntityEvents<Events>['init']);
    }

    protected _executeProcess (data: EntityEvents<Events>['process']): Promise<void> {
        this._process = data;
        return this._execute('process', data);
    }

    public constructor (subscribers?: EntitySubscribers<EntityEvents<Events>>) {
        this._subscribers = {
            ...this._subscribers,
            ...(subscribers ?? {}),
        };
    }

    public subscribe<Event extends keyof EntityEvents<Events>> (event: Event, callback: EntityCallback<EntityEvents<Events>[Event]>): void {
        if (event === 'init' && this._initialized) {
            (callback as EntityCallback<EntityEvents<Events>['init']>)(null as EntityEvents<Events>['init']);
            return;
        }

        if (!this._subscribers[event]) {
            this._subscribers[event] = [];
        }
        this._subscribers[event]!.push(callback);
    }

    public unsubscribe<Event extends keyof EntityEvents<Events>> (event: Event, callback: EntityCallback<EntityEvents<Events>[Event]>): void {
        if (this._subscribers[event]) {
            this._subscribers[event] = this._subscribers[event]!.filter((item) => item !== callback);
        }
    }
}