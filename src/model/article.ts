// import { tag } from "@/model/tag";
export interface Ipagination {
  page: number;
  pageSize: number;
}

export class PageParams {
  page = 1;
  pageSize = 10;
}

export interface IresArticle {
  code: number;
  data: {
    total: number;
    data: {
      id: number;
      bodyHtml?: string;
      createTime?: string;
      nickName?: string;
      summary?: string;
      tag: {
        tagId: number;
        tagName: string;
        tagCover: string;
      };
      title?: string;
      weight?: number;
      viewCount?: number;
    };
  };
}
