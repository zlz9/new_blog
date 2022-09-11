<template>
  <div class="layout">
    <el-container>
      <el-header class="head">
        <NavView />
      </el-header>
      <el-container>
        <el-aside class="menu">
          <el-affix :offset="120">
            <MenuView />
          </el-affix>
        </el-aside>

        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <el-aside class="board">
          <el-affix :offset="120"> <BulletinBoard /></el-affix>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavView from "@/components/nav/NavView.vue";
import MenuView from "@/components/menu/MenuView.vue";
// import BulletinBoard from "@/components/bulletin-board/BulletinBoard.vue"
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
.menu {
  width: 200px;
}
.board {
  display: flex;
  width: 260px;
}
</style>
