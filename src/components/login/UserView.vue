<template>
  <div class="user">
    <div>
      <el-avatar :src="avator" />
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ nickName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="showUpdateUser">修改信息</el-dropdown-item>
          <el-dropdown-item @click="showUPdatePwd">修改密码</el-dropdown-item>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <userInfo ref="$userInfo" />
    <update-user ref="$updateUser" />
    <update-pwd ref="$updatePwd" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { logoutApi } from "@/api";
import router from "@/router";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const $userInfo = ref();
const $updateUser = ref();
const $updatePwd = ref();
let avator = ref("");
let nickName = ref("");
watch(
  userStore,
  () => {
    if (userStore.userInfo) {
      avator.value = userStore.userInfo.avator || "";
      nickName.value = userStore.userInfo.nickName || "";
    }
  },
  { immediate: true }
);
const logout = () => {
  logoutApi().then((res) => {
    if (res.code == 200) {
      /**
       * 清除用用户信息
       */
      userStore.menu = [];
      userStore.token = "";
      userStore.perms = [];
      userStore.userInfo = {};
      localStorage.clear;
      ElMessage({
        type: "success",
        message: "退出登录成功",
      });
    }
    router.push("/login");
  });
};

const showUPdatePwd = () => {
  $updatePwd.value.upload = true;
};

const showUpdateUser = () => {
  $updateUser.value.upload = true;
};
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.user {
  width: 60px;
}

.ruleForm {
  width: 400px;
}
.avator {
  position: relative;
  left: 60%;
  top: 100px;
}
</style>
