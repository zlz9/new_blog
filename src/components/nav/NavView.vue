<template>
  <el-affix>
    <div class="head">
      <SearchDialog ref="$SearchDialog" />
      <div class="search">
        <el-button
          size="large"
          :icon="Search"
          round
          class="search_btn"
          @click="search"
          >Search</el-button
        >
      </div>
      <div class="title">My Blog😘😘</div>
      <UserView />
    </div>
  </el-affix>
</template>

<script setup lang="ts">
import UserView from "../login/UserView.vue";
import { Search } from "@element-plus/icons-vue";
import SearchDialog from "../search/SearchDialog.vue";
import { ref } from "vue";
const $SearchDialog = ref("$SearchDialog");
const search = () => {
  $SearchDialog.value.dialogVisible = true;
};
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
}
.search_btn {
  height: 40px;
  width: 100%;
}
</style>
