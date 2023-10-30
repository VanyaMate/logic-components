import Entity from './modules/entity/Entity';
import { EntityCallback, EntityDefaultEvents, EntityEvents } from './modules/entity/Entity.types';


type EntityEvent<Events> = EntityDefaultEvents & Events;

type CheckboxEvents = {
    toggle: boolean;
    counter: number;
}

const checkbox = new Entity<CheckboxEvents>();
checkbox.subscribe('init', (b) => {
});

checkbox.subscribe('counter', (st) => {
});

class Checkbox extends Entity<CheckboxEvents> {
    private _status: boolean = false;
    private _counter: number = 0;

    set (status: boolean): void {
        this._status = status;
        this._execute('toggle', status);
        this._execute('counter', 123);
    }

    toggle (): void {
        this._status = !this._status;
        this._execute('toggle', this._status);
    };
}