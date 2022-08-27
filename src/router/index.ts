import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/views/home/HomeView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    redirect: "/article",
    children: [
      {
        path: "/article",
        name: "Article",
        component: () => import("@/views/article/ArticleView.vue"),
        meta: {
          title: "文章",
          icon: "Notebook",
        },
        children: [
          {
            path: "/hotarticle",
            name: "HotArticle",
            component: () => import("@/views/article/HotArticle.vue"),
          },
          {
            path: "/tagarticle",
            name: "TagArticle",
            component: () => import("@/views/article/TagArticle.vue"),
          },
        ],
      },
      {
        path: "/write",
        name: "write",
        component: () => import("@/views/article/WriteView.vue"),
      },
      {
        path: "/works",
        name: "works",
        component: () => import("@/views/collection/WorksView.vue"),
      },
      {
        path: "/interview",
        name: "InterView",
        component: () => import("@/views/collection/InterView.vue"),
      },
      {
        path: "/tools",
        name: "Tools",
        component: () => import("@/views/collection/ToolsView.vue"),
      },
      {
        path: "/admin",
        name: "Admin",
        meta: {
          title: "管理",
          icon: "Operation",
        },
        children: [
          {
            path: "/adminArticle",
            name: "AdminArticle",
            component: () => import("@/views/article/AdminArticle.vue"),
            meta: {
              title: "文章管理",
              icon: "Operation",
            },
          },
          {
            path: "/system",
            name: "System",
            component: () => import("@/views/system/SystemView.vue"),
            meta: {
              title: "系统管理",
              icon: "Operation",
            },
          },
        ],
      },
      {
        path: "/aboutme",
        name: "AboutMe",
        component: () => import("@/views/aboutme/AboutMeView.vue"),
        meta: {
          title: "关于我",
          icon: "Medal",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/login/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/components/login/RegisterView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "error",
    component: () => import("@/views/error/ErrorView.vue"),
    meta: {
      icon: "#",
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
