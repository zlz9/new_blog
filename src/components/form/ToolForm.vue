<template>
  <el-divider></el-divider>
  <el-table :data="toolData" style="width: 100%">
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
</template>

<script lang="ts" setup>
import { Timer } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import { getToolApi, deleteToolApi } from "@/api";
import { ElMessage } from "element-plus";

interface IresWork {
  creatTime: string;
  description: string;
  img: [];
  linkGitee: string;
  linkGithub: string;
  name: string;
  position: string;
  preview: string;
}

let toolData = ref();

getToolApi().then((res) => {
  if (res.code == 200) {
    toolData.value = res.data;
  }
});
const handleDelete = (index: number, row: any) => {
  console.log(row.id);
  deleteToolApi(row.id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
      getToolApi();
    }
  });
};
</script>

<style lang="scss" scoped></style>
