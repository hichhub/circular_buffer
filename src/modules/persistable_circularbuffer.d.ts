import { IPersistableCircularBuffer } from '../interfaces/ICircularBuffer';
import { IKVStore } from '../interfaces/IKVStore';
import CircularBuffer from './circularbuffer';
export default class PersistableCircularBuffer<T> extends CircularBuffer<T> implements IPersistableCircularBuffer<T> {
    storeName: string;
    store: IKVStore;
    arrayStoreName: string;
    mapStoreName: string;
    private STORENAME;
    constructor(size: number, store: IKVStore, storeName?: string);
    load(store: IKVStore, storeName: string): Promise<boolean>;
    set(key: string, value: T): Promise<T>;
    del(key: string): Promise<boolean>;
    flush(): Promise<boolean>;
}
