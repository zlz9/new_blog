<template>
  <div>
    <el-drawer v-model="userForm" :title="userInfo.nickName" direction="rtl" size="26%">
      <el-avatar :src="userInfo.avatar" :size="100" />
      <div class="user_detail">
        <div class="nickName">
          姓名: {{ userStore.userInfo.nickName }}<el-icon color="blue"><Male /></el-icon>
        </div>
        <div class="email">邮箱：{{ userInfo.email }}</div>
        <div class="phone">电话：{{ userInfo.phoneNumber }}</div>
        <div class="birthday">
          出生日期：{{ day(userInfo.birthday).format("YYYY-MM-DD") }}
        </div>
        <div class="motto">座右铭：{{ userInfo.motto }}</div>
        <div class="like">总点赞数:66</div>
        <div class="all_article">总文章数:77</div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineExpose } from "vue";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const userInfo = reactive({
  nickName: "welcome," + userStore.userInfo.nickName || "佩奇",
  avatar: userStore.userInfo.avator,
  motto: userStore.userInfo.motto,
  sex: userStore.userInfo.sex,
  email: userStore.userInfo.email,
  phoneNumber: userStore.userInfo.phoneNumber,
  birthday: userStore.userInfo.birthday,
});
const userForm = ref(false);
defineExpose({ userForm });
</script>

<style lang="scss" scoped>
$font-family: "Comic Sans MS", cursive;
:deep(.el-drawer__body) {
  display: flex;
  flex-direction: column;
  align-items: center;
  .user_detail {
    margin: 20px;
    .like,
    .email,
    .all_article,
    .phone,
    .birthday,
    .motto,
    .nickName {
      margin: 10px;
      font-size: 20px;
      font-family: $font-family;
    }
    .email {
    }
    .phone {
    }
    .birthday {
    }
    .motto {
    }
  }
}
</style>
