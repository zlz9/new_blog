import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Particles from "particles.vue3";
import "animate.css/animate.min.css";
import { createPinia } from "pinia";
// v-md-editor
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App);
// .use(VueMarkdownEditor)
// .use(createPinia())
// .use(router)
// .use(Particles)
// .mount("#app");
app
  .use(VueMarkdownEditor)
  .use(createPinia())
  .use(router)
  .use(Particles)
  .mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
