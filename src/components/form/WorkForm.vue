<template>
  <div class="title">作品管理</div>
  <el-divider></el-divider>
  <el-table :data="workData.workList" style="width: 100%">
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
    :total="workData.total"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { Timer } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { getWorksApi, deleteWorkApi } from "@/api";
import { ElMessage } from "element-plus";

let workData = reactive({
  workList: [],
  total: Number(""),
});

let pageParams = reactive({
  page: 1,
  pageSize: 10,
});
const getWork = () => {
  return getWorksApi(pageParams).then((res) => {
    if (res.code == 200) {
      workData.workList = res.data.workList;
      workData.total = res.data.total;
    }
  });
};

onMounted(() => {
  getWork();
});

const handleDelete = (index: number, row: any) => {
  console.log(row.id);
  deleteWorkApi(row.id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      getWork();
    }
  });
};
const handleCurrentChange = (val: number) => {
  pageParams.page = val;
  getWork();
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
