import { EntityCallback } from './Entity.types';


export interface IEntity<SubscribeTypes> {
    subscribe<T extends keyof SubscribeTypes> (event: T, callback: EntityCallback<SubscribeTypes[T]>): void;

    unsubscribe<T extends keyof SubscribeTypes> (event: T, callback: EntityCallback<SubscribeTypes[T]>): void;
}