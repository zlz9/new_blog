<template>
  <div v-permission="userStore.userInfo.role">
    <div class="title">开发工具</div>
    <el-divider></el-divider>
    <el-table :data="toolData.tools" style="width: 100%" @cell-dblclick="goToolInfo">
      <el-table-column label="创建时间" width="500">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{
              day(scope.row.createTime).format("YYYY - MM - DD")
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="500">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>项目名称:{{ scope.row.name }}</div>
              <div>项目定位:{{ scope.row.description }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.name }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm
            title="是否确定删除?"
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
      :total="toolData.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { Timer } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { getToolApi, deleteToolApi } from "@/api";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const router = useRouter();
let pageParams = reactive({
  page: 1,
  pageSize: 10,
});
let toolData = reactive({
  tools: [],
  total: Number(""),
});
onMounted(() => {
  getTool();
});
const getTool = () => {
  return getToolApi(pageParams).then((res) => {
    if (res.code == 200) {
      toolData.tools = res.data.data;
      toolData.total = res.data.total;
    }
  });
};
const handleDelete = (index: number, row: any) => {
  console.log(row.id);
  deleteToolApi(row.id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      getTool();
    }
  });
};

// 去工具详情页
const goToolInfo = (row) => {
  router.push({ path: "/tools", query: { id: row.id } });
};
/**
 * 分页查询
 */
const handleCurrentChange = (val: number) => {
  pageParams.page = val;
  getTool();
};
</script>

<style lang="scss" scoped>
$font-family: "Comic Sans MS", cursive;
.title {
  color: antiquewhite;
  font-family: $font-family;
  font-size: 20px;
  margin: 10px;
}
</style>
