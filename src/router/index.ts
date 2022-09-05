import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/views/home/HomeView.vue";
import { useUserStore } from "@/store/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    redirect: "/hot",
    children: [
      {
        path: "/article",
        name: "Article",
        meta: {
          title: "文章",
          icon: "Notebook",
        },
        children: [
          {
            path: "/hot",
            name: "Hot",
            component: () => import("@/views/article/HotArticle.vue"),
            meta: {
              title: "热门文章",
              icon: "Notebook",
            },
          },
          /**
           * 文章详情
           */
          {
            path: "/article/info",
            name: "ArticleInfo",
            component: () => import("@/views/article/ArticleInfo.vue"),
            meta: {
              title: "文章详情",
              icon: "Notebook",
            },
          },
          {
            path: "/tag",
            name: "Tag",
            component: () => import("@/views/article/TagArticle.vue"),
            meta: {
              title: "标签",
              icon: "Notebook",
            },
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (!userStore.token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});
export default router;
