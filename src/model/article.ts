export interface Ipagination {
  page: number;
  pageSize: number;
}

export interface PageParams {
  page: number;
  pageSize: number;
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
/**
 * 推荐文章model
 */
export interface IrecommendArticles {
  id: number;
  title: string;
}
/**
 * 当前用户的文章列表
 */

export interface IcurrentArticle {
  articleList: Array<IarticleInfo>;
  total: number;
}

export interface IarticleInfo {
  title: string;
  summary: string;
  createTime: string;
}
/**
 * 当前用户文章参数
 */
export interface IpageParams {
  page: number;
  pageSize: number;
  query: string;
}

// {
//   "id":67,
//   "title":"修改一下文章",
//   "summary":"修改一下文章",
//   "mdBody":"修改一下文章",
//   "tags":[
//       {"tagId":1},
//     {"tagId":2}
//   ]
// }
export interface IupdateArticle {
  id: number;
  title: string;
  summary: string;
  mdBody: string;
}
