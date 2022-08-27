<template>
  <div class="login_bj">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="ruleForm"
    >
      <el-form-item>
        <el-avatar
          :src="avatorUrl"
          size="large"
          shape="circle"
          fit="fill"
          class="avator"
        ></el-avatar>
      </el-form-item>

      <el-form-item prop="userName">
        <el-input
          v-model="ruleForm.userName"
          type="text"
          autocomplete="off"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-link type="primary" @click="goRegister"
          >没有账号？点击跳转到注册页面</el-link
        >
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import router from "@/router";
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
  userName: "",
  password: "",
});

const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  userName: [{ validator: validateUserName, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      router.push("/home");
      console.log("submit!");
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

const goRegister = () => {
  router.push("/register");
};
const avatorUrl = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
</script>

<style scoped lang="scss">
$color: #213d5b;
.login_bj {
  border-radius: 15px;
  width: 600px;
  height: 500px;
  background-color: $color;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 240px;
  .ruleForm {
    width: 300px;
    .avator {
      margin: 0 auto;
    }
    .btn {
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
