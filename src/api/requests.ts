//引入login
// import login from "@/store/login";
// 引入进度条
import "nprogress/nprogress.css";
import nprogress from "nprogress";
//对axios进行二次封装
import axios from "axios";
import router from "@/router";
const requests = axios.create({
  //配置对象
  baseURL: "localhost",
  timeout: 30000,
  withCredentials: true,
});

// 添加请求拦截器
requests.interceptors.request.use(
  function (config) {
    nprogress.start();
    config.headers = config.headers || {};
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token") || "";
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
requests.interceptors.response.use(
  function (res) {
    nprogress.done();
    const code: number = res.data.code;
    if (code == 401) {
      router.push("/login");
    }
    // if (code != 200) {
    //   return Promise.reject(res.data);
    // }
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default requests;
