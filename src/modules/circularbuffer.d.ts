import { ICircularBuffer, IToArrayCallbackfn } from '../interfaces/ICircularBuffer';
export default class CircularBuffer<T> implements ICircularBuffer<T> {
    size: number;
    mapBuffer: {
        [key: string]: T;
    };
    arrayBuffer: string[];
    pointer: number;
    defaultToArrayFilters: any[];
    constructor(size?: number);
    incPointer(): number;
    set(key: string, value: T): Promise<T>;
    get(key: string): Promise<T>;
    del(key: string): Promise<boolean>;
    toArray(callbackfn?: IToArrayCallbackfn<T>): Promise<T[]>;
    flush(): Promise<boolean>;
}
