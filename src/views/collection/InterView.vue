<template>
  <div>
    <upload-inter-view ref="$upload" @handle="refresh"></upload-inter-view>
  </div>
  <div>
    <el-row :gutter="20" style="margin-top: 20px">
      <transition-group
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <el-col :span="4" v-for="(item, index) in dataList" :key="item.id">
          <div class="inter_view_item" style="margin: 10px">
            <img v-lazy="item.cover" alt="" />
          </div>
          <div style="display: flex; justify-content: space-around">
            <el-link type="primary" :href="item.link">前往外链</el-link>
            <el-tooltip effect="dark" placement="top">
              <template #content>
                <div class="detail">
                  {{ item.summary }}
                </div>
              </template>
              <el-link class="summary" size="20" href="#" type="primary">
                详情
              </el-link></el-tooltip
            >
          </div>
        </el-col>
      </transition-group>

      <el-col
        :span="4"
        style="
          height: 210px;
          padding-right: 10px;
          padding-left: 10px;
          position: relative;
          top: 10px;
          font-size: 60px;
        "
      >
        <div class="plus" @click="showUpload">
          <el-icon style="width: 100%; height: 100%" size="100"><Plus /></el-icon>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getInterViewApi } from "@/api";
const dataList = ref();
const interviewList = () => {
  return getInterViewApi().then((res) => {
    if (res.code == 200) {
      dataList.value = res.data;
    }
  });
};
const $upload = ref();
const showUpload = () => {
  $upload.value.upload = true;
};

const refresh = () => {
  // 再次刷新数据
  interviewList();
};

onMounted(() => {
  interviewList();
});
</script>

<style scoped lang="scss">
.detail {
  width: 300px;
  text-indent: 2em;
}
.inter_view_item {
  img {
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }
}
.plus {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
  .icon {
  }
}
</style>
