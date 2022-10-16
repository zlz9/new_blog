import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Particles from "particles.vue3";
import "animate.css/animate.min.css";
// v-md-editor
import VMdPreviewHtml from "@kangc/v-md-editor/lib/preview-html";
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
// 自定义指令
import Direc from "@/directives";
import * as dayjs from "dayjs";
// permission
// pinia
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia();
pinia.use(piniaPersist);
// 暂时解决不了
// import store from "./store";
// 图片懒加载
import lazyPlugin from "vue3-lazy";
const app = createApp(App);
app.config.globalProperties.day = dayjs;

import { checkArray } from "@/permission/Array";
app
  .use(VueMarkdownEditor)
  .use(VMdPreviewHtml)
  .use(pinia)
  .use(router)
  .use(Particles)
  .use(Direc)
  .use(lazyPlugin, {
    loading: require("../public/static/img/loading.jpg"), // 图片加载时默认图片
    error: require("../public/static/img/load-false.jpg"), // 图片加载失败时默认图片
  })
  .mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.directive("permission", {
  mounted(el, binding) {
    const permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      const hasPermission: boolean = checkArray(permission);
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
});
