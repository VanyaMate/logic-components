import { EntityCallback, EntityEvents } from './entity/Entity.types';
import Checkbox from './modules/ui/checkbox/Checkbox';
import { ICheckbox } from './modules/ui/checkbox/Checkbox.interface';
import { CheckboxEvents } from './modules/ui/checkbox/Checkbox.types';


const checkbox: ICheckbox = new Checkbox(false, {
    init   : [ () => console.log('checkbox initialized') ],
    process: [ (status) => console.log('checkbox process:', status) ],
    toggle : [ (state) => console.log('checkbox toggle:', state) ],
});

const onInitHandler: EntityCallback<EntityEvents<CheckboxEvents>['init']> = function () {
    console.log('additional checkbox init');
};

const onProcessHandler: EntityCallback<EntityEvents<CheckboxEvents>['process']> = function (status) {
    console.log('additional process:', status);
};


const onToggleHandler: EntityCallback<EntityEvents<CheckboxEvents>['toggle']> = function (state) {
    console.log('additional toggle:', state);
};


checkbox.subscribe('init', onInitHandler);
checkbox.subscribe('process', onProcessHandler);
checkbox.subscribe('toggle', onToggleHandler);


checkbox.toggle(false).then((value) => console.log('toggled', value));