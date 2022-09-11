import requests from "./requests";
import { loginParmas, IascnyRouter, Iperms } from "@/model/user";
import { tagList } from "@/model/tag";
import { IresArticle } from "@/model/article";

import { ImenuItem, Ires } from "@/model/user";

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
//  /api/publish 发布文章，
//  参数：
//  {
//   "tags":[
//       {"tagId":1},
//       {"tagId":2}
//   ],
//  "arthorId": 1,
//  "bodyHtml": "哈哈",
//  "bodyMd": "#hh",
//  "summary": "测试一下接口",
//  "title": "哈哈"
// }
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
