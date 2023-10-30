import Entity from './modules/entity/Entity';
import { EntityDefaultEvents, EntityEvents } from './modules/entity/Entity.types';


type EntityEvent<Events> = EntityDefaultEvents & Events;

type CheckboxEvents = {
    toggle: boolean
}

const checkbox = new Entity<CheckboxEvents>();
checkbox.subscribe('toggle', (b) => {
});

class Checkbox extends Entity<CheckboxEvents> {
    private _status: boolean = false;

    set (status: boolean): void {
        this._status = status;
        this._execute('toggle', status);
    }

    toggle (): void {
        this._status = !this._status;
        this._execute('toggle', this._status);
    };
}