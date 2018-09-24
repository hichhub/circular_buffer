export interface ICircularBuffer<T> {
  size: number
  set (key: string, value: T): void
  get (key: string): Promise<T>
  del (key: string): void
  toArray (): Promise<T[]>
}

export interface IPersistableCircularBuffer<T> extends ICircularBuffer<T> {
  init (): Promise<boolean>
}
