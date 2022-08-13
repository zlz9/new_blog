<template>
  <div class="layout">
    <el-container>
      <el-header class="head">
        <NavView />
      </el-header>
      <el-container>
        <el-aside width="300px">
          <MenuView />
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavView from "@/components/nav/NavView.vue";
import MenuView from "@/components/menu/MenuView.vue";
</script>

<style scoped lang="scss">
.head {
  height: 150px;
}
.main {
  min-height: 600px;
  border: 1px solid red;
}
</style>
