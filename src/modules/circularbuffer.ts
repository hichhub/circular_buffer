import constants from '../constants';
import { ICircularBuffer, IToArrayCallbackfn } from '../interfaces/ICircularBuffer';
import { logger } from '../logger';

export default class CircularBuffer<T> implements ICircularBuffer<T> {
  public size: number = 0;
  public mapBuffer: Map<string, T> = new Map();
  public arrayBuffer: string[] = [];
  public pointer: number = -1;
  public defaultToArrayFilters = [null, undefined];
  constructor (size: number = constants.DEFAULT_BUFFER_SIZE) {
    this.size = size;
    this.arrayBuffer = new Array(size);
  }
  public incPointer () {
    this.pointer++;
    this.pointer %= this.size;
    return this.pointer;
  }
  public async set (key: string, value: T): Promise<T> {
    if (this.mapBuffer.has(key)) {
      this.mapBuffer.set(key, value);
    } else {
      this.incPointer();

      if (this.arrayBuffer[this.pointer] != null) {
        this.mapBuffer.delete(this.arrayBuffer[this.pointer]);
      }

      this.arrayBuffer[this.pointer] = key;
      this.mapBuffer.set(key, value);
    }
    return value;
  }
  public async get (key: string): Promise<T> {
    return this.mapBuffer.get(key) as T;
  }
  public async del (key: string): Promise<boolean> {
    this.mapBuffer.delete(key);
    return true;
  }
  public async toArray (callbackfn?: IToArrayCallbackfn<T>): Promise<T[]> {
    const values = [...this.mapBuffer.values()];

    if (callbackfn) { return values.filter(callbackfn); }

    return values.filter((item: T) => {
      return typeof item !== 'string';
      return true;
    });
  }
  public async flush (): Promise<boolean> {
    this.pointer = -1;
    this.arrayBuffer = [];
    this.mapBuffer.clear();
    return true;
  }
}
