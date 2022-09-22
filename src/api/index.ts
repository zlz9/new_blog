import requests from "./requests";
import { loginParmas, Iperms } from "@/model/user";
import { tagList } from "@/model/tag";
import { IresArticle, IpageParams } from "@/model/article";

import { ImenuItem, Ires } from "@/model/user";
import { IrecommendArticles, IcurrentArticle } from "@/model/article";
import { IresMsg } from "@/model/root";
export const LoginApi = (params: loginParmas) =>
  requests({
    url: "/api/user/login",
    method: "post",
    params,
  });

export function CaptchaApi() {
  requests({ url: "/api/captcha", method: "get" });
}

// "/api/tagList"
export const getTag = (): Promise<tagList> => {
  return requests.get("/api/tagList");
};

// /api/article 获取全部文章 参数 page ,pageSize
export const getArticleApi = (): Promise<IresArticle> => {
  return requests.get("/api/article");
};

// /api/user/perms 获取当前用户权限

export const getPermsApi = (): Promise<Iperms> => {
  return requests.get("/api/user/perms");
};

// /api/user/menu 获取当前用户的menu表
export const getMenuApi = (): Promise<Ires<ImenuItem>> => {
  return requests.get("/api/user/menu");
};
// /api/user/info 获取当前登录用户信息
export const getUserApi = () => {
  return requests.get("/api/user/info");
};
// /api/user/logout
export const logoutApi = () => {
  return requests.post("/api/user/logout");
};
export const publishApi = (params: any) => {
  return requests.post("/api/publish", params);
};

// /upload  发布图片 参数 image post
export const addImgApi = (data: any) => {
  return requests.post("/upload", data);
};

// /api/article/{{id}} 文章详情 参数：文章id
export const articleInfo = (id: number) => {
  return requests.get(`/api/article/${id}`);
};

//推荐文章  /api/article/recommend
export const recommendArticlesApi = (): Promise<Ires<IrecommendArticles>> => {
  return requests.get("/api/article/recommend");
};
// 获取当前用户的文章列表 /api/article/author
export const currentAuthorArticlesApi = (params: IpageParams) =>
  requests({
    url: "/api/article/author",
    method: "get",
    params,
  });
// 删除当前登录用户的文章 /api/delelet/article/id={id}
export const delArticle = (id: number): Promise<IresMsg> => {
  return requests.post(`/api/delelet/article/id=${id}`);
};
/**
 * 更新文章 /api/article/update 
 * post
 * {
    "id":67,
    "title":"修改一下文章",
    "summary":"修改一下文章",
    "mdBody":"修改一下文章",
    "tags":[
        {"tagId":1},
      {"tagId":2}
    ]
}
 */

export const updateArticleApi = (data: object): Promise<IresMsg> => {
  return requests.post("/api/article/update", data);
};

//获取文章评论 /api/article/comment/{id} get 参数id：文章id
export const getArticleCommentApi = (id: number): Promise<object> => {
  return requests.get(`/api/article/comment/${id}`);
};
// 发布文章评论 /api/article/create/comment post
//  {
//   "articleId": 0,
//   "content": "",
//   "level": 0,
//   "parentId": 0,
//   "toUserId": 0
// }
export const commentApi = (data: object): Promise<object> => {
  return requests.post("/api/article/create/comment", data);
};

// /api/tag/articles id page pageSize get'
export const getArticleByTagApi = (params: object): Promise<object> => {
  return requests({ url: "/api/tag/articles", params: params, method: "get" });
};
