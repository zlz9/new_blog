<template>
  <div class="layout">
    <el-container>
      <el-header class="head">
        <NavView />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <MenuView />
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <el-aside class="board">
          <BulletinBoard></BulletinBoard>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavView from "@/components/nav/NavView.vue";
import MenuView from "@/components/menu/MenuView.vue";
import BulletinBoard from "@/components/bulletin-board/BulletinBoard.vue";
</script>

<style scoped lang="scss">
.head {
  height: 150px;
}
.main {
  margin: 10px;
  min-height: 600px;
  // border: 1px solid red;
  cursor: pointer;
}
.board {
  display: flex;
  width: 260px;
}
</style>
