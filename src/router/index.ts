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
      // {
      //   path: "/article",
      //   name: "Article",
      //   meta: {
      //     title: "文章",
      //     icon: "Notebook",
      //     isShow: true,
      //   },
      //   children: [
      {
        path: "/hot",
        name: "Hot",
        component: () => import("@/views/article/HotArticle.vue"),
        meta: {
          title: "热门文章",
          icon: "Notebook",
          isShow: true,
        },
      },
      //     /**
      //      * 文章详情
      //      */
      //     {
      //       path: "/article/info",
      //       name: "ArticleInfo",
      //       component: () => import("@/views/article/ArticleInfo.vue"),
      //       meta: {
      //         title: "文章详情",
      //         icon: "Notebook",
      //         isShow: false,
      //       },
      //     },
      //     {
      //       path: "/tag",
      //       name: "Tag",
      //       component: () => import("@/views/article/TagArticle.vue"),
      //       meta: {
      //         title: "标签",
      //         icon: "Notebook",
      //         isShow: true,
      //       },
      //     },
      //   ],
      // },
      // {
      //   path: "/write",
      //   name: "Write",
      //   component: () => import("@/views/article/WriteView.vue"),
      // },
      // {
      //   path: "/works",
      //   name: "Works",
      //   component: () => import("@/views/collection/WorksView.vue"),
      // },
      // {
      //   path: "/interview",
      //   name: "InterView",
      //   component: () => import("@/views/collection/InterView.vue"),
      // },
      // {
      //   path: "/tools",
      //   name: "Tools",
      //   component: () => import("@/views/collection/ToolsView.vue"),
      // },
      // {
      //   path: "/admin",
      //   name: "Admin",
      //   meta: {
      //     title: "管理",
      //     icon: "Operation",
      //   },
      //   children: [
      //     {
      //       path: "/adminArticle",
      //       name: "AdminArticle",
      //       component: () => import("@/views/article/AdminArticle.vue"),
      //       meta: {
      //         title: "文章管理",
      //         icon: "Operation",
      //       },
      //     },
      //     {
      //       path: "/system",
      //       name: "System",
      //       component: () => import("@/views/system/SystemView.vue"),
      //       meta: {
      //         title: "系统管理",
      //         icon: "Operation",
      //       },
      //     },
      //   ],
      // },
      // {
      //   path: "/aboutme",
      //   name: "AboutMe",
      //   component: () => import("@/views/aboutme/AboutMeView.vue"),
      //   meta: {
      //     title: "关于我",
      //     icon: "Medal",
      //   },
      // },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/login/LoginView.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/components/login/RegisterView.vue"),
  },
  // {
  //   path: "/:catchAll(.*)",
  //   name: "error",
  //   component: () => import("@/views/error/ErrorView.vue"),
  //   meta: {
  //     icon: "#",
  //     title: "404",
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  /**
   * 路由跳转滚动条
   * @param to
   * @param from
   * @param savedPosition
   * @returns
   */
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

let isF = false; //这个是用于判断动态路由是否已经被获取
router.beforeEach(async (to, from) => {
  const store = useUserStore();
  if (to.path == "/login") {
    return true;
  }
  if (!store.token && to.path != "/hot") {
    return { path: "/login" };
  } else {
    if (isF) {
      return true;
    } else {
      // let add = store.getters.menuList || "";
      const add = store.menu;
      console.log(add, "menu");

      routerData(add);
      isF = true;
      return { ...to, replace: true };
    }
  }
});

const routerData = (result: any) => {
  const currenRoutes = router.options.routes;
  if (result) {
    result.forEach((item: any) => {
      // has用于判断当前路由中是否已经具有，避免重复
      const has = currenRoutes.some((it) => it.path == item.path);
      if (!has) {
        router.addRoute("Home", {
          path: item.path,
          name: item.name,
          meta: {
            title: item.name,
            isShow: item.isShow,
            icon: item.icon,
          },
          component: () => import(`@/views${item.component}.vue`),
        });
      }
      if (item.children && item.children.length) {
        routerData(item.children);
      }
    });
  }
};
export default router;
