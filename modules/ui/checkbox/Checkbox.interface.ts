import { IEntity } from '../../../entity/Entity.interface';
import { EntityEvents } from '../../../entity/Entity.types';
import { CheckboxEvents } from './Checkbox.types';


export interface ICheckbox extends IEntity<EntityEvents<CheckboxEvents>> {
    value: boolean;

    toggle (state?: boolean): Promise<boolean>;
}