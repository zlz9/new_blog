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
    <el-sub-menu :index="item.path" v-for="item in menu.hasChildren" :key="item.path">
      <template #title>
        <component :is="item.icon" class="icon"></component>
        <span>{{ item.title }}</span>
      </template>

      <template v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item-group v-if="subItem.isShow === 'true'">
          <el-menu-item :index="subItem.path" :disable="subItem.isShow">
            <component :is="subItem.icon" class="icon"></component>
            <span>
              {{ subItem.title }}
            </span>
          </el-menu-item>
        </el-menu-item-group>
      </template>
    </el-sub-menu>

    <!-- 一级导航 -->
    <template v-for="item in menu.noChildren" :key="item.path">
      <el-menu-item :index="item.path" v-if="item.isShow === 'true'">
        <template #title>
          <component :is="item.icon" class="icon"></component>
          <span> {{ item.title }} </span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { ref, reactive, computed, onMounted, nextTick } from "vue";
import { useUserStore } from "@/store/user";
const isCollapse = ref(true);
const userStore = useUserStore();
/**
 *触发pinia请求
 */

userStore.getMenu();

let menu = reactive({
  noChildren: [],
  hasChildren: [],
});

watch(userStore, () => {
  menu.noChildren = computed(() => {
    return userStore.menu.filter((item) => !item.children);
  });
  menu.hasChildren = computed(() => {
    return userStore.menu.filter((item) => item.children);
  });
  console.log(menu.noChildren, "menu.noChildren");
});
/**
 * 动态路由
 */

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// const menuList = reactive([
//   {
//     path: "/article",
//     name: "Article",
//     meta: {
//       title: "文章",
//       icon: "Reading",
//     },
//     children: [
//       {
//         path: "/hot",
//         name: "Hot",
//         meta: {
//           title: "热门文章",
//           icon: "Notebook",
//         },
//       },
//       {
//         path: "/tag",
//         name: "Tag",
//         meta: {
//           title: "标签",
//           icon: "Notebook",
//         },
//       },
//     ],
//   },
//   {
//     path: "/write",
//     name: "write",
//     meta: {
//       title: "写博客",
//       icon: "Edit",
//     },
//   },
//   {
//     path: "/works",
//     name: "Works",
//     meta: {
//       title: "作品仓库",
//       icon: "Collection",
//     },
//   },
//   {
//     path: "/interview",
//     name: "InterView",
//     meta: {
//       title: "面试",
//       icon: "User",
//     },
//   },
//   {
//     path: "/tools",
//     name: "Tools",
//     meta: {
//       title: "开发工具",
//       icon: "Tools",
//     },
//   },
//   {
//     path: "/admin",
//     name: "Admin",
//     meta: {
//       title: "管理",
//       icon: "Operation",
//     },
//     children: [
//       {
//         path: "/adminArticle",
//         name: "AdminArticle",
//         meta: {
//           title: "文章管理",
//           icon: "Operation",
//         },
//       },
//       {
//         path: "system",
//         name: "System",
//         meta: {
//           title: "系统管理",
//           icon: "Operation",
//         },
//       },
//     ],
//   },
//   {
//     path: "/aboutme",
//     name: "AboutMe",
//     meta: {
//       title: "关于我",
//       icon: "Medal",
//     },
//   },
// ]);
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
