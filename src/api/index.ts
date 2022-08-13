import requests from "./requests";
export const LoginApi = (params: any) =>
  requests({ url: "/login", method: "post", params });
export const ArticleApi = () => {
  requests({ url: "/getarticle", method: "get" });
};
