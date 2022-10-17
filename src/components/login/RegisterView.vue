<template>
  <div style="display: flex; flex-direction: column; align-items: center">
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

        <el-form-item prop="email">
          <el-input
            v-model="ruleForm.email"
            type="text"
            autocomplete="off"
            placeholder="请输入QQ邮箱"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            placeholder="请再次确认密码"
            show-password
          />
        </el-form-item>

        <el-form-item prop="code">
          <div style="display: flex; width: 100%">
            <el-input
              maxlength="6"
              minlength="6"
              v-model="ruleForm.code"
              type="text"
              autocomplete="off"
              placeholder="请输入验证码"
            />
            <el-button
              style="#5dc1a3;margin-left: 5px"
              :loading="checkCodeBtn.loading"
              :disabled="checkCodeBtn.disabled"
              @click="getCheckCode"
              >{{ checkCodeBtn.text }}</el-button
            >
          </div>
        </el-form-item>

        <el-form-item>
          <el-link type="primary" @click="goLogin">已有账号？</el-link>
        </el-form-item>

        <el-form-item>
          <div class="btn">
            <el-button @click="submitForm(ruleFormRef)">注册</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <FooterView class="footer" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { registerApi, getEmailCodeApi } from "@/api";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import router from "@/router";
const ruleFormRef = ref<FormInstance>();

const validatePass = (rule, value, callback) => {
  const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
  if (regPassword.test(value)) {
    return callback();
  } else if (value == "") {
    callback(new Error("请输入密码"));
  }
  callback(new Error("密码必须由数字、字母两种字符组成，长度在8-15位之间："));
};

const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入不匹配"));
  } else {
    callback();
  }
};

const checkEmail = (rule, value, callback) => {
  const regEmail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  if (regEmail.test(value)) {
    return callback();
  } else if (value == "") {
    return callback(new Error("请输入QQ验证码"));
  }
  callback(new Error("请输入合法的QQ号"));
};

// 按钮倒计时
let checkCodeBtn = reactive<any>({
  text: "获取验证码",
  loading: false,
  disabled: false,
  duration: 60,
  timer: null,
});

// 根据用户名获取验证码
const getCheckCode = () => {
  // 如果email为空 提示输入验证码
  if (ruleForm.email == "") {
    ElMessage({
      type: "error",
      message: "请输入QQ邮箱",
    });
    return;
  }
  // 倒计时期间按钮不能单击
  if (checkCodeBtn.duration !== 60) {
    checkCodeBtn.disabled = true;
  }
  // 清除掉定时器
  checkCodeBtn.timer && clearInterval(checkCodeBtn.timer);
  // 开启定时器
  checkCodeBtn.timer = setInterval(() => {
    const tmp = checkCodeBtn.duration--;
    checkCodeBtn.text = `${tmp}秒`;
    if (tmp <= 0) {
      // 清除掉定时器
      clearInterval(checkCodeBtn.timer);
      checkCodeBtn.duration = 60;
      checkCodeBtn.text = "重新获取";
      // 设置按钮可以单击
      checkCodeBtn.disabled = false;
    }
  }, 1000);

  getEmailCodeApi(ruleForm.email).then((res) => {
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "发送验证码成功,请检查您的邮箱",
      });
    } else if (res.code == 443) {
      ElMessage({
        type: "error",
        message: `${res.msg}`,
      });
    } else if (res.code == 446) {
      ElMessage({
        type: "error",
        message: `${res.msg}`,
      });
    }
  });
};

const ruleForm = reactive({
  userName: "",
  password: "",
  checkPass: "",
  email: "",
  code: "",
});

const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  userName: [{ validator: validateUserName, trigger: "blur" }],
  email: [{ validator: checkEmail, trigger: "blur" }],
  code: [
    {
      required: true,
      message: "请输入六位数验证码",
      trigger: "blur",
    },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 进行用户注册
      registerApi(ruleForm).then((res) => {
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "注册成功!",
          });
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          ElMessage({
            type: "error",
            message: `${res.msg}`,
          });
        }
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

const avatorUrl = ref(
  "http://qiniu.zhoulizheng.cn/43507260-9412-4a12-88f4-eddb2c3a858f.jpg"
);

const goLogin = () => {
  router.replace("/login");
};
</script>

<style scoped lang="scss">
$color: #213d5b;
.login_bj {
  border-radius: 15px;
  width: 600px;
  margin: 0 auto;
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
.footer {
  top: 500px;
  width: 90%;
}
</style>
