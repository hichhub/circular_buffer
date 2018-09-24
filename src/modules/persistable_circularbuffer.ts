import constants from '../constants';
import { ICircularBuffer, IPersistableCircularBuffer } from '../interfaces/ICircularBuffer';
import { IKVStore } from '../interfaces/IKVStore';
import { logger } from '../logger';
import CircularBuffer from './circularbuffer';

export default class PersistableCircularBuffer<T> extends CircularBuffer<T> implements IPersistableCircularBuffer<T> {
  public store: IKVStore;
  public storeName: string;
  public arrayStoreName: string;
  public mapStoreName: string;
  constructor (size: number, store: IKVStore, storeName: string = 'PersistableCircularBuffer') {
    super(size);
    this.store = store;
    this.storeName = storeName;
    this.arrayStoreName = `${storeName}_arraybuffer`;
    this.mapStoreName = `${storeName}_mapbuffer`;
  }
  public async init (): Promise<boolean> {
    try {
      this.arrayBuffer = JSON.parse(await this.store.get(this.arrayStoreName));
    } catch (error) {
      logger.error(error);
      return false;
    }
    try {
      this.mapBuffer = JSON.parse(await this.store.get(this.arrayStoreName));
    } catch (error) {
      logger.error(error);
      return false;
    }

    return true;
  }
  public set (key: string, value: T) {
    super.set(key, value);
    this.store.set(this.arrayStoreName, JSON.stringify(this.arrayBuffer));
    this.store.set(this.mapStoreName, JSON.stringify(this.mapBuffer));
  }
}
