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
        path: "/hot",
        name: "Hot",
        component: () => import("@/views/article/HotArticle.vue"),
        meta: {
          title: "热门文章",
          icon: "Notebook",
          isShow: true,
        },
      },
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
    meta: {
      title: "注册",
    },
  },
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
router.beforeEach((to, from, next) => {
  const store = useUserStore();
  // 如果是去login 或者是 hot 放行
  if (to.path == "/login" || to.path == "/hot" || to.path == "/register") {
    next();
  } else if (!store.token) {
    next({ path: "/login" });
  } else {
    if (isF) {
      next();
    } else {
      // let add = store.getters.menuList || "";
      const add = store.menu;
      console.log(add, "menu");
      routerData(add);
      isF = true;
      next({ ...to, replace: true });
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
      /**
       * 添加404路由
       */
      router.addRoute({
        path: "/:pathMatch(.*)",
        name: "error",
        component: () => import("@/views/error/ErrorView.vue"),
        meta: {
          icon: "#",
          title: "404",
        },
      });
    });
  }
};
export default router;
