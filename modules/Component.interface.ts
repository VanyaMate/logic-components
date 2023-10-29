export interface IComponent<Events, Data> {
    subscribe (event: Events, callback: (data: Data) => any): void;

    unsubscribe (event: Events, callback: (data: Data) => any): void;
}