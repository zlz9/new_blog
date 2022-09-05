<template>
  <el-dialog v-model="dialogVisible" title="发布文章">
    <el-input v-model="article.title" placeholder="title" />
    <el-input
      v-model="article.summary"
      :rows="2"
      type="textarea"
      placeholder="summary"
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
    <div>父组件传过来的值{{ articleBody }}</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="publish">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { getTag } from "@/api";
import { tag } from "@/model/tag";
import { publishApi } from "@/api";
let tagList = ref([]);
const chooseTag = (tagId) => {
  tagList.value.push(tagId);
};
type Props = {
  articleBody: {
    text: string;
    html: string;
  };
};
//  参数：
//  {
//   "tags":[
//       {"tagId":1},
//       {"tagId":2}
//   ],
//  "arthorId": 1,
//  "bodyHtml": "哈哈",
//  "bodyMd": "#hh",
//  "summary": "测试一下接口",
//  "title": "哈哈"
// }
let article = reactive({
  title: "",
  summary: "",
  tags: [] as unknown as tag[],
});
const props = defineProps<Props>();
/**
 * 发布文章
 */
const publish = () => {
  let params = {
    tags: tagList.value,
    bodyHtml: props.articleBody.html,
    bodyMd: props.articleBody.text,
    summary: article.summary,
    title: article.title,
  };
  publishApi(params).then((res) => {
    console.log(params.title, "params");

    console.log(res);
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

<style scoped lang="scss"></style>
