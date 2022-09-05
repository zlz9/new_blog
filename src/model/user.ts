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
export interface IresUser {}
