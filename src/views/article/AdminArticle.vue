<template>
  <el-table :data="articleData.articleList" style="width: 100%" v-loading="loading">
    <el-table-column label="标题" prop="title" />
    <el-table-column label="摘要" prop="summary" />
    <el-table-column label="发布时间" prop="createTime" :formatter="formatterTime" />
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="pageParams.query"
          size="large"
          placeholder="搜索文章"
          @keydown.enter="getArticles"
        />
      </template>
      <template #default="scope">
        <el-button
          size="large"
          color="#d9b9d1"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="handleDelete(scope.$index, scope.row)"
        >
          <template #reference>
            <el-button color="#eb0808" size="large">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    style="justify-content: end"
    hide-on-single-page
    v-model:currentPage="pageParams.page"
    v-model:page-size="pageParams.pageSize"
    layout="prev, pager, next, jumper"
    :total="articleData.total"
    @current-change="handleCurrentChange"
  />
  <div class="work_form">
    <!-- 作品管理 -->
    <work-form></work-form>
    <!-- 工具管理 -->
    <tool-form></tool-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from "vue";
import { IarticleInfo } from "@/model/article";
import dayjs from "dayjs";
import { currentAuthorArticlesApi, delArticle } from "@/api";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
const loading = ref(true);
/**
 * 发送请求获取当前用户文章信息
 */
const router = useRouter();
const route = useRoute();
let pageParams = reactive({
  page: 1,
  pageSize: 10,
  query: "",
});
let articleData = reactive({
  articleList: [],
  total: Number(""),
});

const getArticles = async () => {
  const res = await currentAuthorArticlesApi(pageParams);
  setTimeout(() => {
    loading.value = false;
  }, 1200);
  articleData.articleList = res.data.articleList;
  articleData.total = res.data.total;
  // console.log(res.data.total, "total2");
};

onMounted(() => {
  getArticles();
});
// 格式化时间
const formatterTime = (row) => {
  return dayjs(row.createTime).format("YYYY-MM-DD");
};
// 修改文章
const handleEdit = (index: number, row: IarticleInfo) => {
  console.log(row.id, "row");
  router.push({ path: "/write", query: { id: row.id } });
};
// 删除文章
const handleDelete = (index: number, row: IarticleInfo) => {
  console.log(row.id, "row");
  delArticle(row.id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: "删除文章成功！",
        type: "success",
      });
    }
    setTimeout(() => {
      getArticles();
    }, 800);
  });
};

/**
 * 分页查询
 */

const handleCurrentChange = (val: number) => {
  pageParams.page = val;
  getArticles();
};
// 删除文章
</script>

<style scoped lang="scss"></style>
