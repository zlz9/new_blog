<template>
  <div class="board">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><h3>
              身份:
              <span class="role">
                {{ userInfo.role }}
              </span>
            </h3></span
          >
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
import { reactive, watch, watchEffect } from "vue";
import { useUserStore } from "@/store/user";
const store = useUserStore();
const userInfo = reactive({
  avator: "",
  nickName: "",
  motto: "",
  role: "",
});
watchEffect(() => {
  userInfo.avator = store.userInfo.avator;
  userInfo.nickName = store.userInfo.nickName;
  userInfo.motto = store.userInfo.motto;
  userInfo.role = store.userInfo.role;
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
.role {
  color: rgb(131, 58, 180);
  color: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(173, 49, 49, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
}
</style>
