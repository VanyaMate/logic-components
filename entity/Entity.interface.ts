import { EntityCallback, EntityDefaultEvents } from './Entity.types';


export interface IEntity<Events> {
    subscribe<Event extends keyof Events> (event: Event, callback: EntityCallback<Events[Event]>): void;

    unsubscribe<Event extends keyof Events> (event: Event, callback: EntityCallback<Events[Event]>): void;
}