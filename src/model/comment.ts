export interface Icomment {
  articleId: number;
  author: {
    id: number;
    nickName: string;
    avator: string;
  };
  childrens: Array<Icomment>;
  content: string;
  createDate: string;
  id: number;
  level: number;
  parentId: number;
  toUser: {
    id: number;
    nickName: string;
    avator: string;
  };
}
