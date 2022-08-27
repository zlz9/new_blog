<template>
  <div class="board">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><h3>网站公告</h3></span>
        </div>
      </template>
      <div>{{ board }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const board = ref(
  "Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。"
);
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}
.board {
  display: flex;
  flex-direction: column;
  .cart {
    height: 200px;
    .box-card {
      width: 100%;
      height: 100%;
    }
  }
  .calendar {
    height: 200px;
    .el-calendar {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
