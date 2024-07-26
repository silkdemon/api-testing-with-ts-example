export interface IDataProvider {
  postJson<T, R>(path: string, value: T): Promise<R>;
  getData<T>(path: string): Promise<T>;
  deleteData<T>(path: string): Promise<T>;
}
