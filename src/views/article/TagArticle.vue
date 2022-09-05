<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in tags" :key="item.tagId" class="col">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.tagCover" class="image" />
          <div style="padding: 14px">
            <span></span>
            <div class="bottom">
              <time class="time">{{ item.tagName }}</time>
              <el-button text class="button">查看详情</el-button>
            </div>
          </div>
        </el-card>
        <div
      /></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTagStore } from "@/store/tag";
import { getTag } from "@/api";
import { tag } from "@/model/tag";

let tags = ref<tag[]>();
const tagStore = useTagStore();
const tagList = getTag().then((res) => {
  console.log(res);
  tags.value = res.data;
  tagStore.tagList = res.data as [];
});

onMounted(() => {
  tagList;
});
</script>

<style scoped lang="scss">
.box {
  .col {
    margin-top: 20px;
    .time {
      font-size: 12px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .button {
      padding: 0;
      min-height: auto;
    }

    .image {
      width: 100%;
      display: block;
    }
  }
}
</style>
