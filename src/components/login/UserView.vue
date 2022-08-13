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
          <el-dropdown-item @click="dialogFormVisible = true"
            >登录</el-dropdown-item
          >
          <el-dropdown-item>退出</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-dialog v-model="dialogFormVisible" title="用户登录">
    <el-avatar
      :size="100"
      class="avator"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="75px"
      class="ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-link type="primary">没有账号？前往注册</el-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
const dialogFormVisible = ref(false);
import type { FormInstance } from "element-plus";
import { LoginApi } from "@/api/index";
const ruleFormRef = ref<FormInstance>();
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};
const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};
const ruleForm = reactive({
  username: "",
  pass: "",
});
const rules = reactive({
  pass: [{ validator: validatePass, trigger: "blur" }],
  username: [{ validator: validateUserName, trigger: "blur" }],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      LoginApi(ruleForm)
        .then((result: any) => {
          console.log(result);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
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
