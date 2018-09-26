import { IKVStore } from './IKVStore';
export interface ICircularBuffer<T> {
    size: number;
    set(key: string, value: T): Promise<T>;
    get(key: string): Promise<T>;
    del(key: string): Promise<boolean>;
    flush(): Promise<Boolean>;
    toArray(callbackfn?: IToArrayCallbackfn<T>): Promise<T[]>;
}
export interface IPersistableCircularBuffer<T> extends ICircularBuffer<T> {
    load(store: IKVStore, storeName: string): Promise<boolean>;
}
export declare type IToArrayCallbackfn<T> = (value?: T, index?: number, array?: T[]) => boolean;
