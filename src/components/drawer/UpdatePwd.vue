<template>
  <el-drawer v-model="upload" size="80%" direction="btt">
    <template #header>
      <div class="title">修改密码</div>
    </template>
    <div class="box">
      <!-- 表单 -->

      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="ruleForm.newPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="checkPassword">
          <el-input v-model="ruleForm.checkPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" color="#626aef"
            >上传<el-icon class="el-icon--right"><Upload /></el-icon
          ></el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose } from "vue";
import type { FormInstance } from "element-plus";
import { newpassword } from "@/api";
import { ElMessage } from "element-plus";
let upload = ref(false);

// 验证规则
const password = (rule, value, callback) => {
  const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
  if (regPassword.test(value)) {
    return callback();
  } else if (value == "") {
    callback(new Error("请输入密码"));
  }
  callback(new Error("密码必须由数字、字母两种字符组成，长度在8-15位之间："));
};
const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.newPassword) {
    callback(new Error("两次输入不匹配"));
  } else {
    callback();
  }
};
/**
 * 表单
 */
const ruleFormRef = ref<FormInstance>();

let ruleForm = reactive({
  oldPassword: "",
  newPassword: "",
  checkPassword: "",
});

const rules = reactive({
  oldPassword: [{ validator: password, trigger: "blur" }],
  newPassword: [{ validator: password, trigger: "blur" }],
  checkPassword: [{ validator: checkPassword, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (ruleForm.oldPassword == ruleForm.newPassword) {
        return ElMessage({
          type: "error",
          message: "新旧密码重复",
        });
      }
      newpassword(ruleForm).then((res) => {
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: `${res.msg}`,
          });
        } else {
          ElMessage({
            type: "error",
            message: `${res.msg}`,
          });
        }
        setTimeout(() => {
          upload.value = false;
        }, 800);
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

defineExpose({ upload });
</script>

<style lang="scss" scoped>
.title {
  color: burlywood;
  font-size: x-large;
  font-family: "Comic Sans MS", cursive;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f3dcf5;
  width: 100%;
  height: 100%;
  justify-content: center;
  .upload {
    position: relative;
    left: 3%;
    margin: 20px;
  }
}
</style>
