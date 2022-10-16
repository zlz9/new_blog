<template>
  <div class="autocomplete">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="搜索文章"
      :trigger-on-focus="false"
      @select="handleSelect"
      :select-when-unmatched="true"
      @key.enter="search"
      clearable
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, nextTick } from "vue";
import { searchArticle } from "@/api";
import { useRouter } from "vue-router";
const state = ref("");
const router = useRouter();
const emit = defineEmits<{ (e: "handle"): void }>();
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
const search = () => {
  console.log("触发");
};
const handleSelect = (item) => {
  router.push({ path: "/article/info", query: { id: item.id } });
  state.value = "";
  emit("handle");
};
</script>

<style lang="scss" scoped>
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
  height: 50px;
  width: 600px;
}
:deep(.el-input__wrapper) {
  border-radius: 20px;
}
</style>
