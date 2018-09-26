import constants from '../constants';
import { ICircularBuffer, IPersistableCircularBuffer } from '../interfaces/ICircularBuffer';
import { IKVStore } from '../interfaces/IKVStore';
import { logger } from '../logger';
import CircularBuffer from './circularbuffer';

export default class PersistableCircularBuffer<T> extends CircularBuffer<T> implements IPersistableCircularBuffer<T> {
  set storeName (newName: string) {
    this.STORENAME = newName;
    this.arrayStoreName = `${this.STORENAME}_arraybuffer`;
    this.mapStoreName = `${this.STORENAME}_mapbuffer`;
  }
  public store: IKVStore;
  public arrayStoreName: string;
  public mapStoreName: string;
  private STORENAME: string;
  constructor (size: number, store: IKVStore, storeName: string = 'PersistableCircularBuffer') {
    super(size);
    this.store = store;
    this.storeName = storeName;
  }
  public async load (store: IKVStore, storeName: string): Promise<boolean> {
    this.store = store;
    this.storeName = storeName;

    try {
      logger.debug(await this.store.get(this.arrayStoreName));
      this.arrayBuffer = JSON.parse(await this.store.get(this.arrayStoreName));
    } catch (error) {
      logger.error(error);
      return false;
    }
    try {
      this.mapBuffer = new Map(JSON.parse(await this.store.get(this.mapStoreName)));
    } catch (error) {
      logger.error(error);
      return false;
    }

    return true;
  }
  public set (key: string, value: T) {
    super.set(key, value);
    this.store.set(this.arrayStoreName, JSON.stringify(this.arrayBuffer));
    this.store.set(this.mapStoreName, JSON.stringify([...this.mapBuffer]));
  }
}
