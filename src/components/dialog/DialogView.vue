<template>
  <el-dialog v-model="dialogVisible" title="发布文章">
    <el-input
      v-model="article.title"
      placeholder="title"
      style="margin: 5px; border: 1px solid background-image: linear-gradient(to right, #acb6e5 , #86fde8 ); border-radius: 10px ;height:40px"
    />
    <el-input
      v-model="article.summary"
      :rows="2"
      type="textarea"
      placeholder="summary"
      style="margin: 5px; border: 1px solid background-image: linear-gradient(to right, #acb6e5 , #86fde8 ); border-radius: 10px;height:60px"
    />
    <div>
      <el-checkbox
        @change="chooseTag({ tagId: tag.tagId })"
        v-for="tag in article.tags"
        :key="tag.tagId"
        :label="tag.tagId"
        >{{ tag.tagName }}</el-checkbox
      >
    </div>
    <!-- <div>父组件传过来的值{{ articleBody }}</div> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="$route.query.id ? update() : publish()">{{
          $route.query.id ? "确认更改" : "发布"
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, watchEffect } from "vue";
import { getTag, updateArticleApi, publishApi } from "@/api";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
let tagList = ref([]);
const route = useRoute();
const id = route.query.id;
const router = useRouter();
const chooseTag = (tagId) => {
  tagList.value.push(tagId);
};
type Props = {
  articleBody: {
    text: string;
    html: string;
    title: string;
    summary: string;
  };
};
let article = reactive({
  title: "",
  summary: "",
  tags: ([] as unknown) as tag[],
});
/**
 * 判断是否有id
 * 如果有就赋值article
 */
watchEffect(() => {
  if (id) {
    article.title = props.articleBody.title;
    article.summary = props.articleBody.summary;
  }
});
const update = () => {
  let updateParams = {
    id: route.query.id,
    tags: tagList.value,
    mdBody: props.articleBody.text,
    htmlBody: props.articleBody.html,
    summary: article.summary,
    title: article.title,
  };
  console.log(updateParams, "updateParams");
  updateArticleApi(updateParams).then((res) => {
    if (res.code == 200) {
      setTimeout(() => {
        ElMessage({
          message: "修改文章成功☆*: .｡. o(≧▽≦)o .｡.:*☆",
          type: "success",
        });
        router.push({ path: "/article/info", query: { id } });
      }, 800);
    }
  });
};

console.log(props.articleBody, "props");

const props = defineProps<Props>();
/**
 * 发布文章
 */
const publish = () => {
  console.log("发布了");

  let params = {
    tags: tagList.value,
    bodyHtml: props.articleBody.html,
    bodyMd: props.articleBody.text,
    summary: article.summary,
    title: article.title,
  };
  publishApi(params).then((res) => {
    if (res.code == 200) {
      let id = res.data.id;
      setTimeout(() => {
        ElMessage({
          message: "发布文章成功☆*: .｡. o(≧▽≦)o .｡.:*☆",
          type: "success",
        });
        router.push({ path: "/article/info", query: { id } });
      }, 800);
    }
  });
};
const dialogVisible = ref(false);
getTag().then((res) => {
  article.tags = res.data;
});
onMounted(() => {
  getTag();
});

/**
 * 将dialogVisible暴露出去
 */
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}
</style>
