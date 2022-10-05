<template>
  <div class="board">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span><h3>user-info</h3></span>
        </div>
      </template>
      <div class="user_info">
        <el-avatar :size="100" :src="userInfo.avator" />
        <div class="nick_name">{{ userInfo.nickName }}</div>
        <div class="motto">{{ userInfo.motto }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useUserStore } from "@/store/user";
const store = useUserStore();
const userInfo = reactive({
  avator: store.userInfo.avator,
  nickName: store.userInfo.nickName,
  motto: store.userInfo.motto,
});
</script>

<style lang="scss" scoped>
$font-family: "Comic Sans MS", cursive;
.user_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  .nick_name {
    font-family: $font-family;
    font-size: 20px;
    margin: 10px;
  }
  .motto {
    font-family: $font-family;
    text-indent: 2em;
    font-size: 18px;
    margin: 10px;
  }
}
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
