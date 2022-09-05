<template>
  <div>
    <v-md-preview-html
      :html="articleBody"
      preview-class="vuepress-markdown-body"
    ></v-md-preview-html>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { articleInfo } from "@/api";
import { ref } from "vue";
const route = useRoute();
let articleId = route.query.id;
const articleBody = ref("");
/**
 * 获取文章详情
 */
articleInfo(articleId).then((res) => {
  if (res.code == 200) {
    articleBody.value = res.data.mdBody;
  }
});
</script>

<style scoped lang="scss">
:deep .vuepress-markdown-body {
  display: "flex";
  min-height: 500px;
}
</style>
