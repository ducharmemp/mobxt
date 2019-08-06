import { IObservableValue, IObservableArray } from 'mobx';

export interface Meta {
    __meta__: {
        name: string;
        key: IObservableValue<string | symbol | number | null>;

        collectionName: string | symbol | number;
        relationships: Record<string | symbol, {
            type: any;
            keys: IObservableArray<string>;
            options: Record<string, any>;
        }>;
        indexes: (string | symbol | number)[];
    };
}
