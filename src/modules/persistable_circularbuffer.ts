import { ICircularBuffer, IPersistableCircularBuffer } from '../interfaces/ICircularBuffer';
import constants from '../constants';
import CircularBuffer from './circularbuffer';
import { IKVStore } from '../interfaces/IKVStore';

export default class PersistableCircularBuffer<T> extends CircularBuffer<T> implements IPersistableCircularBuffer<T> {
  store: IKVStore
  storeName: string
  arrayStoreName: string
  mapStoreName: string
  constructor (size: number, store: IKVStore, storeName: string = 'PersistableCircularBuffer') {
    super(size)
    this.store = store
    this.storeName = storeName
    this.arrayStoreName = `${storeName}_arraybuffer`
    this.mapStoreName = `${storeName}_mapbuffer`
  }
  async init (): Promise<boolean> {
    try {
      this.arrayBuffer = JSON.parse(await this.store.get(this.arrayStoreName))
    } catch (error) {
      console.error(error)
      return false
    }
    try {
      this.mapBuffer = JSON.parse(await this.store.get(this.arrayStoreName))
    } catch (error) {
      console.error(error)
      return false
    }

    return true;
  }
  set (key: string, value: T) {
    super.set(key, value)
    this.store.set(this.arrayStoreName, JSON.stringify(this.arrayBuffer))
    this.store.set(this.mapStoreName, JSON.stringify(this.mapBuffer))
  }
}
