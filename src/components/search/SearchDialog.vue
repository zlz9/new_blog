<template>
  <el-dialog v-model="dialogVisible" style="visibility: hidden">
    <div class="autocomplete" style="visibility: visible">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="搜索文章"
        :trigger-on-focus="false"
        @select="handleSelect"
        clearable
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
let dialogVisible = ref(false);
import { ref, defineExpose } from "vue";
import { searchArticle } from "@/api";
import { useRouter } from "vue-router";
const state = ref("");
const router = useRouter();

const querySearch = (queryString, cb) => {
  searchArticle(queryString).then((res) => {
    // 转换数据，把标题的key转化成value
    let results = res.data.map((item) => {
      return {
        value: item.title,
        id: item.id,
      };
    });
    results = queryString ? results.filter(createFilter(queryString)) : results;
    //cb是回调函数，返回筛选出的结果数据到输入框下面的输入列表
    cb(results);
  });
};

//我这里用的是调用match方法，是模糊匹配；官方调用的是indexOf，是精确匹配，看自身情况选择
const createFilter = (queryString) => {
  return (item) => {
    return item.value.toUpperCase().match(queryString.toUpperCase());
  };
};
const handleSelect = (item) => {
  router.push({ path: "/article/info", query: { id: item.id } });
  state.value = "";
  dialogVisible.value = false;
};
const search = () => {
  console.log("出啊发");
};

defineExpose({ dialogVisible });
</script>

<style scoped lang="scss">
.autocomplete {
  display: flex;
  justify-content: center;
}
:deep(.el-dialog__body) {
  display: flex;
  justify-content: center;
}
:deep(.el-autocomplete) {
  display: flex;
  height: 70px;
  width: 600px;
}
:deep(.el-input__wrapper) {
  border-radius: 40px;
  border: 1px, #1be2e1;
}
:deep(.el-dialog) {
  visibility: hidden;
}
:deep(.el-input__wrapper) {
  visibility: visible;
}
</style>
