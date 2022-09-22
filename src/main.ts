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

import * as dayjs from "dayjs";
// pinia
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia();
pinia.use(piniaPersist);
// 暂时解决不了
// import store from "./store";

import UndrawUi from "undraw-ui";
import "undraw-ui/dist/style.css";

const app = createApp(App);
app.config.globalProperties.day = dayjs;
app
  .use(VueMarkdownEditor)
  .use(VMdPreviewHtml)
  .use(pinia)
  .use(router)
  .use(Particles)
  .use(UndrawUi)
  .mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
