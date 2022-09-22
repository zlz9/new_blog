<template>
  <!-- 根据标签查找文章 -->
  <el-table :data="articleList" style="width: 100%">
    <el-table-column label="标题" prop="title" />
    <el-table-column label="摘要" prop="summary" />
    <el-table-column label="发布时间" prop="createTime" :formatter="formatterTime" />

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="default" @click="articleInfo(scope.$index, scope.row)"
          >文章详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { getArticleByTagApi } from "@/api";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import dayjs from "dayjs";
const router = useRouter();
const route = useRoute();
const id = route.query.id;
const articleList = ref();
// 格式化时间
const formatterTime = (row) => {
  return dayjs(row.createTime).format("YYYY-MM-DD");
};
let params = {
  id: id,
  page: 1,
  pageSize: 10,
};

const articleInfo = (index: number, row: object) => {
  console.log(row.id, "row");
  router.push({ path: "/article/info", query: { id: row.id } });
};

getArticleByTagApi(params).then((res) => {
  if (res.code == 200) {
    articleList.value = res.data;
  }
  console.log(articleList, "标签文章");
});
</script>

<style lang="scss" scoped></style>
