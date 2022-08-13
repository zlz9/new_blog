<template>
  <el-affix>
    <div class="head">
      <SearchView class="search" />
      <div class="title">My Blog😘😘</div>
      <UserView class="login" />
    </div>
  </el-affix>
</template>

<script setup lang="ts">
import UserView from "../login/UserView.vue";
import SearchView from "../search/SearchView.vue";
</script>

<style scoped lang="scss">
$color: rgb(188, 218, 183);

.head {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $color;
  height: 100px;
  .search {
    width: 15%;
  }
}
.title {
  width: 70%;
  font-size: 30px;
  text-align: center;
  font-family: "Comic Sans MS", cursive;
}
.login {
  width: 15%;
}
</style>
