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
          show-password
        />
      </el-form-item>
      <el-form-item prop="code" class="code">
        <el-input
          v-model="ruleForm.code"
          type="text"
          autocomplete="off"
          placeholder="请输入验证码"
        />
        <img :src="imgUrl" alt="" srcset="" @click="changeImgCode" />
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
import { FormInstance, ElMessage } from "element-plus";
import router from "@/router";
import { LoginApi } from "@/api";
import { useUserStore } from "@/store/user";
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

const validateCode = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入验证码"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  userName: "",
  password: "",
  code: "",
});

const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  userName: [{ validator: validateUserName, trigger: "blur" }],
  code: [{ validator: validateCode, trigger: "blur" }],
});

const userStore = useUserStore();

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      LoginApi(ruleForm)
        .then((res) => {
          console.log(res, "登录");
          if (res.code == 200) {
            /**
             * 获取权限列表，动态路由
             */

            setTimeout(() => {
              router.push("/");
            }, 1500);
            userStore.setToken(res.data.token);
            console.log(userStore.token, "token");
            ElMessage({
              message: "登录成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err, "err");
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

const goRegister = () => {
  router.push("/register");
};
const avatorUrl = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);

let imgUrl = ref("/api/captcha?time=");
const changeImgCode = () => {
  imgUrl.value = imgUrl.value + new Date();
  console.log(imgUrl);
};
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
.code {
  display: flex;
  flex-direction: row;
  ::v-deep .el-form-item__content {
    flex-wrap: nowrap;
  }
  img {
    width: 100px;
    height: 30px;
    margin-left: 2px;
  }
}
</style>
