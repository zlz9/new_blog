<template>
  <div class="autocomplete">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="搜索用户"
      :trigger-on-focus="false"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from "vue";
import { getUserByNickName } from "@/api";
import { useRouter } from "vue-router";
const router = useRouter();
const state = ref();
const querySearch = (queryString, cb) => {
  //allInfos是怎么来，是从父组件传过来的还是在自己组件调用api接口拿到的还是其他
  //我这里的allInfos是从父组件传过来的，在这里也举例子组件从父组件传值
  getUserByNickName(queryString).then((res) => {
    let results = res.data.map((item) => {
      return {
        value: item.nickName,
        id: item.id,
      };
    });
    results = queryString ? results.filter(createFilter(queryString)) : results;
    //cb是回调函数，返回筛选出的结果数据到输入框下面的输入列表
    cb(results);
  });
};
//该方法仿写官方文档，如果没有特别的需求，该方法改动不大
//这是当输入数据时触发的，筛选出和输入数据匹配的建议输入。
//我这里用的是调用match方法，是模糊匹配；官方调用的是indexOf，是精确匹配，看自身情况选择
const createFilter = (queryString) => {
  return (item) => {
    return item.value.toUpperCase().match(queryString.toUpperCase());
  };
};

const handleSelect = (item) => {
  router.push({ path: "/user/details", query: { id: item.id } });
};
</script>

<style lang="scss" scoped>
.autocomplete {
  display: flex;
  justify-content: center;
  margin: 20px;
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
  background-color: aquamarine;
  border-radius: 20px;
}
:deep(.el-input__inner) {
  text-align: center;
}
</style>
