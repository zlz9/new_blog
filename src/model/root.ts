export interface Ires<T> {
  code?: number;
  msg?: string;
  data?: Array<T>;
}
export interface IresObject<T> {
  code: number;
  msg?: string;
  data: T;
}
export interface articleParams {
  page: number;
  pageSize: number;
  query: string;
}

export interface IresMsg {
  code: number;
  msg: string;
}
