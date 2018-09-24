export interface IKVStore {
  get (key: string): Promise<string>
  set (key: string, value: string): Promise<string>
  del (key: string): Promise<string>
}

export interface IGenericKVStore<T> {
  get (key: string): Promise<T>
  set (key: string, value: T): Promise<T>
  del (key: string): Promise<string>
}
