<template>
  <!-- <el-button @click="upload = true" style="width: 100%"
    ><el-icon><Plus /></el-icon
  ></el-button> -->
  <el-drawer v-model="upload" size="80%" direction="btt">
    <template #header>
      <div class="title">上传</div>
    </template>
    <div class="box">
      <div class="upload">
        <el-upload
          ref="$upload"
          list-type="picture-card"
          :auto-upload="false"
          :http-request="uploadFile"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
      <!-- 表单 -->

      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="网站介绍" prop="summary">
          <el-input v-model="ruleForm.summary" autocomplete="off" />
        </el-form-item>
        <el-form-item label="网站链接" prop="link">
          <el-input v-model.number="ruleForm.link" />
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
import { ref, reactive, defineExpose, defineEmits } from "vue";
import type { UploadFile } from "element-plus";
import { Plus, ZoomIn } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import { uploadInterviewApi, addImgApi } from "@/api";
import { ElMessage } from "element-plus";
const $upload = ref();
const emit = defineEmits<{ (e: "handle"): void }>();
const dialogImageUrl = ref("");
let dialogVisible = ref(false);
const upload = ref(false);
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const uploadFile = (option: any) => {
  let formData = new FormData();
  formData.append("image", option.file);
  addImgApi(formData)
    .then((res) => {
      console.log(res);
      ruleForm.cover = res.msg;
    })
    .then(() => {
      uploadInterviewApi(ruleForm).then((res) => {
        /**
         * 上传成功
         * 关闭对话框
         * 父组件刷新
         */
        if (res.code == 200) {
          ElMessage({
            type: "success",
            message: "上传成功！！",
          });
          emit("handle");
          setTimeout(() => {
            upload.value = false;
          }, 1000);
        }
      });
    });
};

/**
 * 表单
 */
const ruleFormRef = ref<FormInstance>();

let ruleForm = reactive({
  name: "",
  summary: "",
  link: "",
  cover: "",
});

const checkLink = (rule, value, callback) => {
  const regPreview = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
  if (regPreview.test(value)) {
    return callback();
  } else if (value == "") {
    return callback(new Error("请输入网址"));
  }
  callback(new Error("请输入合法的网址格式"));
};

const rules = reactive({
  name: [
    {
      min: 3,
      max: 8,
      trigger: "blur",
      required: true,
      message: "请输入3-8个字符",
    },
  ],
  summary: [
    {
      min: 10,
      max: 30,
      trigger: "blur",
      required: true,
      message: "请输入10-30个字符",
    },
  ],
  link: [{ trigger: "blur", required: true, validator: checkLink }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      $upload.value.submit();
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
  background-color: beige;
  width: 100%;
  height: 100%;
  .upload {
    position: relative;
    left: 3%;
    margin: 20px;
  }
}
</style>
