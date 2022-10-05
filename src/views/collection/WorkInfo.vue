<template>
  <!-- 作品详情模块 -->
  <div>
    <el-carousel :interval="2000" type="card" height="400px">
      <el-carousel-item v-for="item in workInfo.img" :key="item.id">
        <img v-lazy="item.url" alt="" style="width: 100%; height: 100%" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div>
    <el-card>
      <div>
        <el-descriptions title="作品详情">
          <el-descriptions-item label="作品名称:">{{
            workInfo.name
          }}</el-descriptions-item>
          <el-descriptions-item label="线上预览:">
            <el-link type="primary" :href="workInfo.preview">{{
              workInfo.preview ? workInfo.preview : "暂无"
            }}</el-link></el-descriptions-item
          >
          <el-descriptions-item label="GitHub:"
            ><el-link type="primary" :href="workInfo.linkGithub">{{
              workInfo.linkGithub ? workInfo.linkGithub : "暂无"
            }}</el-link></el-descriptions-item
          >
          <el-descriptions-item label="gitee:">
            <el-link type="primary" :href="workInfo.linkGitee">{{
              workInfo.linkGitee ? workInfo.linkGitee : "暂无"
            }}</el-link></el-descriptions-item
          >
          <el-descriptions-item label="作品定位">
            <el-tag size="small">{{
              workInfo.position ? workInfo.position : "暂无"
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间"
            >{{ day(workInfo.createTime).format("YYYY-MM-DD") }}
          </el-descriptions-item>
          <el-descriptions-item label="产品描述">
            {{ workInfo.description }}
          </el-descriptions-item>
        </el-descriptions>
      </div></el-card
    >
  </div>
</template>

<script setup lang="ts">
import { getWorkDetailApi } from "@/api";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
const route = useRoute();
const workId = route.query.id;
let workInfo = ref({});
getWorkDetailApi(workId).then((res) => {
  if (res.code == 200) {
    workInfo.value = res.data;
  }
});
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
