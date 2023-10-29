import { IComponent } from '../Component.interface';
import { CheckboxEvents } from './Checkbox.types';


export interface ICheckbox extends IComponent<CheckboxEvents, boolean> {
    toggle (): Promise<boolean>;
}