export type SubscriberCallback<Data> = (data: Data) => any;
export type Subscribers<Events extends string | number, Data> = { [key in Events]: SubscriberCallback<Data>[] };
