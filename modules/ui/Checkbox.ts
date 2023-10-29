import { Component } from '../Component';
import { Subscribers } from '../Component.types';
import { ICheckbox } from './Checkbox.interface';
import { CheckboxEvents } from './Checkbox.types';


export class Checkbox extends Component<CheckboxEvents, boolean> implements ICheckbox {
    private _state: boolean = false;

    constructor (initialState: boolean, subscribers?: Partial<Subscribers<CheckboxEvents, boolean>>) {
        super({
            init  : [],
            change: [],
            ...subscribers,
        });
        this._state = initialState;
        this._event('init', initialState);
    }

    public toggle (): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this._state = !this._state;
            this._event('change', this._state);
            resolve(this._state);
        });
    }
}