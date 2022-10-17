import { PageParams } from "./../model/article";
import requests from "./requests";
import { loginParmas, Iperms } from "@/model/user";
import { tagList } from "@/model/tag";
import { IresArticle, IpageParams } from "@/model/article";
import { ImenuItem, Ires } from "@/model/user";
import { IrecommendArticles } from "@/model/article";
import { IresMsg } from "@/model/root";
import { IresWork } from "@/model/work";
import { get } from "lodash";

export const LoginApi = (params: loginParmas) =>
  requests({
    url: "/api/user/login",
    method: "post",
    params,
  });
// 图形验证 /api/captcha
export const CaptchaApi = (time: string) => {
  requests({ url: "/api/captcha", method: "get", params: time });
};

// "/api/tagList"
export const getTag = (): Promise<tagList> => {
  return requests.get("/api/tagList");
};

// /api/article 获取全部文章 参数 page ,pageSize
export const getArticleApi = (params: IpageParams): Promise<IresArticle> => {
  return requests({ url: "/api/article", params, method: "get" });
};

// /api/article/search/{title} 模糊搜索文章 参数 文章标题 post
export const searchArticle = (title: string): Promise<object> => {
  return requests.get(`/api/article/search/${title}`);
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

//获取文章评论 /api/article/comment get 参数:分页参数和id
export const getArticleCommentApi = (params: any): Promise<object> => {
  return requests({
    url: "/api/article/comment",
    method: "get",
    params,
  });
};
// 发布文章评论 /api/article/create/comment post
export const commentApi = (data: object): Promise<object> => {
  return requests.post("/api/article/create/comment", data);
};

// /api/tag/articles id page pageSize get'
export const getArticleByTagApi = (params: object): Promise<object> => {
  return requests({ url: "/api/tag/articles", params: params, method: "get" });
};

// 获取当前用户的作品集 /api/author/works get
export const getWorksApi = (page: object): Promise<object> => {
  return requests({
    url: "/api/author/works",
    method: "get",
    params: page,
  });
};
// 获取作品集 /api/works/detail/{id} get
export const getWorkDetailApi = (id: number): Promise<object> => {
  return requests.get(`/api/works/detail/${id}`);
};
// 上传作品集 /api/works/update
/*
 * @param data
 * @returns
 */
export const updateWorkApi = (data: IresWork): Promise<object> => {
  return requests.post("/api/works/update", data);
};

// /api/work/delete/{id} post 参数 删除文章id
export const deleteWorkApi = (id: string): Promise<object> => {
  return requests.post(`/api/work/delete/${id}`);
};

///api/tool get 获取tool 分页
export const getToolApi = (params: object): Promise<object> => {
  return requests({ url: "/api/tool", method: "get", params });
};

// /api/tool/delete/{id} 根据id删除工具 post
export const deleteToolApi = (id: string): Promise<object> => {
  return requests.post(`/api/tool/delete/${id}`);
};

// /api/tool/upload 上传tool工具
export const uploadTool = (data: object): Promise<object> => {
  return requests.post("/api/tool/upload", data);
};

// /api/interview get 获取当前用户的面试资料
export const getInterViewApi = (): Promise<object> => {
  return requests.get("/api/interview");
};
// /api/interview/upload post 上传用户面试资料
export const uploadInterviewApi = (data: object): Promise<object> => {
  return requests.post("/api/interview/upload", data);
};
// /api/interview/del/{id} 删除面试资料 get
export const delInterView = (id: any) => {
  return requests.get(`/api/interview/del/${id}`);
};

export const updateUserApi = (data: object): Promise<object> => {
  return requests.post("/api/user/fill/info", data);
};

// /api/user/register 用户注册
export const registerApi = (data: object): Promise<object> => {
  return requests.post("/api/user/register", data);
};

// 获取邮箱验证码  /api/sendEmail
export const getEmailCodeApi = (emailReceiver: string): Promise<object> => {
  return requests({
    url: "/api/sendEmail",
    method: "get",
    params: { emailReceiver: emailReceiver },
  });
};

// 用户管理模块

// 分页查询所有用户信息 /api/user/all 参数page /api/user/all
export const getAllUserInfoApi = (page: any): Promise<object> => {
  return requests({ url: "/api/user/all", method: "get", params: page });
};
///api/user/lock/{id} 强制下线并且锁定用户 参数id
export const lockUserApi = (id: any): Promise<object> => {
  return requests.post(`/api/user/lock/${id}`);
};
// /api/user/role 设置用户角色 参数  "id": 0, "role": 0
export const setRoleApi = (data: object): Promise<object> => {
  return requests.post("/api/user/role", data);
};
// 解锁用户 /api/user/unlock/{id}
export const unlockUserApi = (id: any): Promise<object> => {
  return requests.post(`/api/user/unlock/${id}`);
};
// 根据id查询用户详细信息 /api/user/{id}
export const userDetailsApi = (id: any): Promise<object> => {
  return requests.get(`/api/user/${id}`);
};
// 查询锁定用户 /api/user/locked get
export const getLockedApi = (): Promise<object> => {
  return requests.get("/api/user/locked");
};
// 搜索用户昵称 /user/search/{nickName} get 参数：用户昵称
export const getUserByNickName = (nickName: string) => {
  return requests.get(`/api/user/search/${nickName}`);
};
/**
 * 统计用户信息模块
 */
// /api/user/skill 统计用户文章分类
export const getUserSkills = () => {
  return requests.get("/api/user/skill");
};
// /api/user/month/article 查询当前用户30天的文章数
export const getMonthArticle = () => {
  return requests.get("/api/user/month/article");
};
//  统计用户文章阅读数  /api/user/article/viewCount
export const getArticelViewCount = () => {
  return requests.get("/api/user/article/viewCount");
};
// /api/user/work/count 统计用户作品数
export const getWorkCount = () => {
  return requests.get("/api/user/work/count");
};

// 网站模块 /api/system/user/skills get
export const getSystemUserKills = () => {
  return requests.get("/api/system/user/skills");
};
// 重置用户密码 /api/reload/password/{id} post
export const reloadPwdApi = (id: any) => {
  return requests.get(`/api/reload/password/${id}`);
};
// 修改用户密码 /api/user/newpassword post
export const newpassword = (data: any) => {
  return requests.post("/api/user/newpassword", data);
};
// 统计30天文章分布 /api/article/month/all
export const getArticleMonth = () => {
  return requests.get("/api/article/month/all");
};
// 上传文章标签 /api/article/tag/add/
export const addTag = (data: any) => {
  return requests.post("/api/article/tag/add", data);
};
// 删除文章标签 /api/delete/tag/{id} get
export const delTag = (id: any) => {
  return requests.get(`/api/delete/tag/${id}`);
};
