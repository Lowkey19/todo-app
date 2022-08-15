export type RequireOnlyOne<T, K extends keyof T = keyof T> = Pick<T, Exclude<keyof T, K>> &
  {
    [U in K]?: Required<Pick<T, U>> & Partial<Record<Exclude<K, U>, undefined>>;
  }[K];
export type Nullable<T> = T | null;
export type KeyValue<T, K extends PropertyKey = string> = Record<K, T>;
export type WithUser<T> = { userId: string } & T;
export interface Action<T, P extends unknown = undefined> {
  payload: P extends infer Q ? Q : undefined;
  type: T;
}
export type EmptyObject = Record<string, never>;
