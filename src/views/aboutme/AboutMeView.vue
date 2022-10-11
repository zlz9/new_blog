<template>
  <div>
    <div class="userInfo">
      <el-card>
        <h3>发布文章阅读数</h3>
        <div class="count">{{ countData.viewCount }}</div>
      </el-card>
      <el-card
        ><h3>技能</h3>
        <PieView />
      </el-card>
      <el-card
        ><h3>近30天发布文章</h3>
        <div class="count">{{ countData.articleCount }}</div></el-card
      >
      <el-card
        ><h3>作品数</h3>
        <div class="count">{{ countData.workCount }}</div></el-card
      >
    </div>
  </div>
</template>

<script setup ts="ts">
import { getMonthArticle, getArticelViewCount, getWorkCount } from "@/api";
import { reactive } from "vue";
let countData = reactive({
  workCount: "",
  articleCount: "",
  viewCount: "",
});

getArticelViewCount().then((res) => {
  countData.viewCount = res.data;
});
getMonthArticle().then((res) => {
  countData.articleCount = res.data;
});
getWorkCount().then((res) => {
  countData.workCount = res.data;
});
</script>

<style lang="scss" scoped>
$font-family: "Comic Sans MS", cursive;
:deep(.el-card__body) {
  height: 400px;
  width: 600px;
}
.userInfo {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  justify-content: center;
}
.count {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 100px;
  width: 100%;
  height: 100%;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: $font-family;
}
</style>
