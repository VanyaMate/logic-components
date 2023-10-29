import { Checkbox } from './modules/ui/Checkbox';
import { ICheckbox } from './modules/ui/Checkbox.interface';


const onChangeHandler = function (state: boolean): void {
    console.log('OnChangeHandler', state);
};

const onCheckboxInit = function (state: boolean): void {
    console.log('Init', state);
};

const subscribeChangeHandler = function (state: boolean): void {
    console.log('Subscribe', state);
};

const checkbox: ICheckbox = new Checkbox(false, {
    init  : [ onCheckboxInit ],
    change: [ onChangeHandler ],
});

checkbox.toggle().then((status) => console.log('PromiseChange', status));
checkbox.subscribe('change', subscribeChangeHandler);
checkbox.toggle();
