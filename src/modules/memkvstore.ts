import { IGenericKVStore } from '../interfaces/IKVStore';

export default class MemkvStore<T> implements IGenericKVStore<T> {
  public store: Map<string, T> = new Map();
  public async get (key: string): Promise<T> {
    return this.store.get(key) as T;
  }
  public async set (key: string, value: T): Promise<T> {
    this.store.set(key, value);
    return value;
  }
  public async del (key: string): Promise<string> {
    this.store.delete(key);
    return key;
  }
}
