<template>
  <div>
    <div class="box">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(o, index) in 6" :key="o" class="col">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://bpic.588ku.com/element_origin_min_pic/19/04/22/1a4323b5ed12b04af11057134f30adf3.jpg"
              class="image"
            />
            <div style="padding: 14px">
              <span></span>
              <div class="bottom">
                <time class="time">{{ summary }}</time>
                <el-button text class="button">查看详情</el-button>
              </div>
            </div>
          </el-card>
          <div
        /></el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const summary = ref("如何学习java");
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
