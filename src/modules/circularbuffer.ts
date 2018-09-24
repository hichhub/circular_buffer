import { ICircularBuffer, IToArrayCallbackfn } from '../interfaces/ICircularBuffer';
import constants from '../constants'

export default class CircularBuffer<T> implements ICircularBuffer<T> {
  size: number = 0;
  mapBuffer: Map<string, T> = new Map();
  arrayBuffer: Array<string> = [];
  pointer: number = -1
  defaultToArrayFilters = [null, undefined]
  constructor (size: number = constants.DEFAULT_BUFFER_SIZE) {
    this.size = size;
    this.arrayBuffer = new Array(size);
  }
  incPointer () {
    this.pointer++
    this.pointer %= this.size
    return this.pointer
  }
  set (key: string, value: T) {
    if (this.mapBuffer.has(key)) {
      this.mapBuffer.set(key, value);
    } else {
      this.incPointer()
      
      if (this.arrayBuffer[this.pointer] != null) {
        this.mapBuffer.delete(this.arrayBuffer[this.pointer])
      }

      this.arrayBuffer[this.pointer] = key
      this.mapBuffer.set(key, value)
    }
  }
  async get (key: string): Promise<T> {
    return this.mapBuffer.get(key) as T
  }
  del (key: string) {
    this.mapBuffer.delete(key)
  }
  async toArray (callbackfn?: IToArrayCallbackfn<T>): Promise<T[]> {
    let values = [...this.mapBuffer.values()]

    if (callbackfn) return values.filter(callbackfn)
    
    return values.filter((item: T) => {
      return typeof item !== 'string'
      return true
    })
  }
  flush () {
    this.pointer = -1
    this.arrayBuffer = []
    this.mapBuffer.clear()
  }
}
