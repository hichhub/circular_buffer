export interface ICircularBuffer<T> {
  size: number;
  set (key: string, value: T): void;
  get (key: string): Promise<T>;
  del (key: string): void;
  flush (): void;
  toArray (callbackfn?: IToArrayCallbackfn<T>): Promise<T[]>;
}

export interface IPersistableCircularBuffer<T> extends ICircularBuffer<T> {
  init (): Promise<boolean>;
}

export type IToArrayCallbackfn<T> = (value: T, index: number, array: T[]) => T;
