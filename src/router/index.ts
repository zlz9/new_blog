import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeViewVue from "@/views/home/HomeView.vue";
import FirstViewVue from "@/components/FirstView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "firstview",
    component: FirstViewVue,
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/HomeView.vue"),
    redirect: "/home/article",
    children: [
      {
        path: "article",
        name: "article",
        component: () => import("@/views/article/ArticleView.vue"),
      },
      {
        path: "aboutme",
        name: "aboutme",
        component: () => import("@/views/aboutme/AboutMeView.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "error",
    component: () => import("@/views/error/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
