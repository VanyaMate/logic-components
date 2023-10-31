import Entity from '../../../entity/Entity';
import { EntityEvents, EntitySubscribers } from '../../../entity/Entity.types';
import { ICheckbox } from './Checkbox.interface';
import { CheckboxEvents } from './Checkbox.types';


export default class Checkbox extends Entity<CheckboxEvents> implements ICheckbox {
    constructor (private _value: boolean, subscribers?: EntitySubscribers<EntityEvents<CheckboxEvents>>) {
        super(subscribers);
        this._executeInit();
    }

    public get value () {
        return this._value;
    }

    public toggle (state?: boolean): Promise<boolean> {
        return new Promise(async (resolve) => {
            await this._executeProcess(true);

            this._value = state ?? !this._value;
            await this._execute('toggle', this._value);

            await this._executeProcess(false);
            resolve(this._value);
        });
    }
}