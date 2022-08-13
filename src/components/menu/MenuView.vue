<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">折叠</el-radio-button>
  </el-radio-group>
  <el-menu
    :router="true"
    default-active="2"
    class="menu"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1" class="subMenu">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>首页</span>
      </template>
      <el-menu-item index="1-1">
        <template #title><span>文章分类</span></template>
      </el-menu-item>
      <el-menu-item index="1-2">
        <template #title><span>最热文章</span></template>
      </el-menu-item>
      <el-menu-item index="1-3">
        <template #title><span>最新文章</span></template>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>写文章</template>
    </el-menu-item>
    <el-sub-menu index="3" class="subMenu">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>收藏</span>
      </template>
      <el-menu-item index="3-4">
        <template #title><span>面试</span></template>
      </el-menu-item>
      <el-menu-item index="3-4">
        <template #title><span>链接</span></template>
      </el-menu-item>
      <el-menu-item index="3-4">
        <template #title><span>作品管理</span></template>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/home/aboutme">
      <el-icon><icon-menu /></el-icon>
      <template #title>关于我</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.menu:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
.el-menu-item {
  font-size: 20px;
}
.subMenu span {
  font-size: 20px;
}
</style>
