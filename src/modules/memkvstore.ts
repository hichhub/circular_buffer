import { IGenericKVStore, IKVStore } from '../interfaces/IKVStore';

export default class MemkvStore implements IKVStore {
  public store: Map<string, string> = new Map();
  public async get (key: string): Promise<string> {
    return this.store.get(key) as string;
  }
  public async set (key: string, value: string): Promise<string> {
    this.store.set(key, value);
    return value;
  }
  public async del (key: string): Promise<string> {
    this.store.delete(key);
    return key;
  }
}
