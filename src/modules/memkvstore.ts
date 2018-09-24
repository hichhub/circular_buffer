import { IGenericKVStore } from '../interfaces/IKVStore'

export default class MemkvStore<T> implements IGenericKVStore<T> {
  store: Map<string, T> = new Map();
  constructor () {}
  async get (key: string): Promise<T> {
    return this.store.get(key) as T
  }
  async set (key: string, value: T): Promise<T> {
    this.store.set(key, value)
    return value
  }
  async del (key: string): Promise<string> {
    this.store.delete(key)
    return key
  }
}
