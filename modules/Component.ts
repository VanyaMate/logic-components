import { IComponent } from './Component.interface';
import { SubscriberCallback, Subscribers } from './Component.types';


export class Component<Events extends string | number, Data> implements IComponent<Events, Data> {
    private readonly _subscribers: Subscribers<Events, Data>;

    protected constructor (subscribers: Subscribers<Events, Data>) {
        this._subscribers = subscribers;
    }

    /**
     * Подписаться на событие
     * @param {Events} event название события
     * @param {SubscriberCallback<Data>} callback обработчик
     */
    public subscribe (event: Events, callback: SubscriberCallback<Data>): void {
        this._subscribers[event].push(callback);
    }

    /**
     * Отписаться от события
     * @param {Events} event название события
     * @param {SubscriberCallback<Data>} callback обработчик
     */
    public unsubscribe (event: Events, callback: SubscriberCallback<Data>): void {
        this._subscribers[event] = this._subscribers[event].filter((item) => item !== callback);
    }

    /**
     * Вызывает всех подписчиков event
     * @param {Events} event  название события
     * @param {Data} data данные для передачи в callback
     * @protected
     */
    protected _event (event: Events, data: Data): void {
        this._subscribers[event].forEach((callback) => callback(data));
    }
}