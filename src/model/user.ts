export interface Ires<T> {
  code?: number;
  msg?: string;
  data?: Array<T>;
}
export interface loginParmas {
  userName: string;
  password: string;
}

export interface Iperms {
  code: number;
  data: [];
}
export interface IascnyRouter {
  code: number;
  data: Array<Irouter>;
}
export interface Irouter {
  id: number;
  name: string;
  path: string;
  redirect?: string;
  title: string;
  component?: string;
  children?: Array<Irouter>;
}

export interface ImenuItem {
  children: Array<ImenuItem>;
  component: string;
  icon: string;
  id: number;
  isShow: string;
  name: string;
  path: string;
  redirect: string;
  title: string;
}
