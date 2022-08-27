<template>
  <div>
      <el-card>
        <LineView></LineView>
      </el-card>
    <div class="statistics">
      <el-card class="year_read">
        <div></div>
      </el-card>
      <el-card class="skills">
        <div></div>
      </el-card>
      <el-card class="month_read">
        <div></div>
      </el-card>
      <el-card class="pub_article"> </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineView from "@/components/echarts/LineView.vue";
</script>

<style lang="scss" scoped>
.statistics {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10px;
  .year_read,
  .skills,
  .month_read,
  .pub_article {
    width: 600px;
    height: 300px;
    margin: 10px;
  }
}
</style>
