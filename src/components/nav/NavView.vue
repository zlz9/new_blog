<template>
  <el-affix>
    <div class="head">
      <SearchDialog ref="$SearchDialog" />
      <div class="search">
        <el-button size="large" :icon="Search" round class="search_btn" @click="search"
          >Search</el-button
        >
      </div>
      <div class="title">
        ╰(*°▽°*)╯{{ nickName ? nickName + "の" : "猪猪侠の" }}
        Blog😘😘
      </div>
      <UserView />
    </div>
  </el-affix>
</template>

<script setup lang="ts">
import UserView from "../login/UserView.vue";
import { Search } from "@element-plus/icons-vue";
import SearchDialog from "../search/SearchDialog.vue";
import { ref, watch, nextTick, onMounted } from "vue";
import { useUserStore } from "@/store/user";
const $SearchDialog = ref("$SearchDialog");
const userStore = useUserStore();
let nickName = ref("");
const search = () => {
  $SearchDialog.value.dialogVisible = true;
};
watch(
  userStore,
  () => {
    if (userStore.userInfo) {
      nickName.value = userStore.userInfo.nickName;
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
$color: #213d5b;

.head {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $color;
  height: 100px;
  .search {
    width: 10%;
  }
}
.title {
  width: 70%;
  font-size: 30px;
  text-align: center;
  font-family: "Comic Sans MS", cursive;
  color: #1be2d4;
}
.search_btn {
  height: 40px;
  width: 100%;
}
</style>
