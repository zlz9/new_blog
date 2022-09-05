<template>
  <div class="user">
    <div>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        user
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { logoutApi } from "@/api";
import router from "@/router";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
const logout = () => {
  logoutApi().then((res) => {
    if (res.code == 200) {
      const userStore = useUserStore();
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
