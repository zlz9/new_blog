<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">折叠</el-radio-button>
  </el-radio-group>
  <el-menu
    unique-opened
    active-text-color="#3375b9"
    background-color=" #393a3c"
    text-color="#ffffff"
    default-active="1"
    class="el-menu-vertical"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-sub-menu
      :index="item.path"
      v-for="item in hasChildren"
      :key="item.path"
    >
      <template #title>
        <component :is="item.meta.icon" class="icon"></component>
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item :index="subItem.path">
          <component :is="subItem.meta.icon" class="icon"></component>
          <span>
            {{ subItem.meta.title }}
          </span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
    >
      <template #title>
        <component :is="item.meta.icon" class="icon"></component>
        <span> {{ item.meta.title }} </span>
      </template>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const noChildren = computed(() => {
  return menuList.filter((item) => !item.children);
});
const hasChildren = computed(() => {
  return menuList.filter((item) => item.children);
});
const menuList = reactive([
  {
    path: "/article",
    name: "Article",
    meta: {
      title: "文章",
      icon: "Reading",
    },
    children: [
      {
        path: "/hotarticle",
        name: "HotArticle",
        meta: {
          title: "热门文章",
          icon: "Notebook",
        },
      },
      {
        path: "/tagarticle",
        name: "TagArticle",
        meta: {
          title: "标签",
          icon: "CollectionTag",
        },
      },
    ],
  },
  {
    path: "/write",
    name: "write",
    meta: {
      title: "写博客",
      icon: "Edit",
    },
  },
  {
    path: "/works",
    name: "works",
    meta: {
      title: "作品仓库",
      icon: "Collection",
    },
  },
  {
    path: "/interview",
    name: "InterView",
    meta: {
      title: "面试",
      icon: "User",
    },
  },
  {
    path: "/tools",
    name: "Tools",
    meta: {
      title: "开发工具",
      icon: "Tools",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    meta: {
      title: "管理",
      icon: "Operation",
    },
    children: [
      {
        path: "/adminArticle",
        name: "AdminArticle",
        meta: {
          title: "文章管理",
          icon: "Operation",
        },
      },
      {
        path: "system",
        name: "System",
        meta: {
          title: "系统管理",
          icon: "Operation",
        },
      },
    ],
  },
  {
    path: "/aboutme",
    name: "AboutMe",
    meta: {
      title: "关于我",
      icon: "Medal",
    },
  },
]);
console.log(noChildren, "noChildren");
console.log(hasChildren, "hasChildren");
</script>

<style lang="scss" scoped>
$font-style: "Comic Sans MS", cursive;
.el-menu-vertical {
  font-family: $font-style;
  .item_size {
    font-size: 18px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
}
.menu:not(.el-menu--collapse) {
  width: 300px;
  min-height: 800px;
}
</style>
