<template>
  <!-- 上传作品 -->
  <div class="upload_work">
    <el-drawer direction="ttb" v-model="isShowDrawer" size="75%">
      <template #header>
        <div class="title">上传作品</div>
      </template>
      <template #footer>
        <div class="tip">注意:上传的图片要三张以上</div>
      </template>
      <div class="upload">
        <el-upload
          list-type="picture-card"
          multiple
          ref="$uploadImg"
          :http-request="uploadFile"
          :before-upload="beforeImg"
          :on-preview="previewImg"
          :on-remove="removeImg"
          :on-progress="progressImg"
          :on-exceed="exceedImg"
          :on-change="changeImg"
          :limit="limit"
          accept=".jpeg,.png,.jpg,.bmp,.gif"
          :auto-upload="true"
          :file-list="fileList"
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
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img
            style="width: 100%; height: 100%"
            :src="dialogImageUrl"
            alt="Preview Image"
          />
        </el-dialog>
      </div>
      <!-- 表单 -->
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="作品名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              type="text"
              autocomplete="off"
              placeholder="作品名称（必填）"
            />
          </el-form-item>
          <el-form-item label="线上预览 " prop="preview">
            <el-input
              v-model="ruleForm.preview"
              type="text"
              autocomplete="off"
              placeholder="线上预览（选填）"
            />
          </el-form-item>
          <el-form-item label="Github地址" prop="Github">
            <el-input
              v-model.number="ruleForm.Github"
              type="text"
              placeholder="github仓库(选填)"
            />
          </el-form-item>
          <el-form-item label="gitee地址" prop="gitee">
            <el-input
              v-model.number="ruleForm.gitee"
              type="text"
              placeholder="gitee地址(选填)"
            />
          </el-form-item>
          <el-form-item label="产品定位" prop="position">
            <el-input
              v-model.number="ruleForm.position"
              type="text"
              placeholder="产品定位(必填)"
            />
          </el-form-item>
          <el-form-item label="作品描述" prop="description">
            <el-input
              v-model.number="ruleForm.description"
              type="text"
              placeholder="描述一下您的作品！(必填)"
            />
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
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import type { UploadFile } from "element-plus";
import { ref, defineExpose, reactive, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { addImgApi, updateWorkApi } from "@/api";

const emit = defineEmits<{ (e: any, value: any): void }>();

const isShowDrawer = ref(false);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const limit = ref<number>(7);
const disabled = ref(false);
const $uploadImg = ref();
let imgList = ref([]);
let fileList = ref([]);

const handleRemove = (file: UploadFile) => {
  console.log(file);
};
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
const handleDownload = (file: UploadFile) => {
  console.log(file);
};
const previewImg = (image) => {
  console.log(image);
};

const removeImg = (file, fileList) => {
  fileList.value = fileList;
};
const progressImg = (file, fileList) => {
  fileList.value = fileList;
};

const changeImg = (file, fileList) => {
  fileList.value = fileList; //每一个改变都会将el-upload里面的图片传递的参数复制到this.filelist去
  console.log(fileList, "fileList");
};

const exceedImg = () => {
  ElMessage({
    message: "最多只能上传7张图片",
    type: "error",
  });
};

const beforeImg = (file) => {
  const fileName = file.name;
  const fileType = fileName.substring(fileName.lastIndexOf("."));
  // jpeg,.png,.jpg,.bmp,.gif
  if (
    fileType === ".jpg" ||
    fileType === ".png" ||
    fileType === ".jpeg" ||
    fileType === ".bmp" ||
    fileType === ".gif"
  ) {
    // 不处理
  } else {
    // this.$message.error("不是,jpeg,.png,.jpg,.bmp,.gif文件,请上传正确的图片类型");
    ElMessage({
      type: "error",
      message: "不是,jpeg,.png,.jpg,.bmp,.gif文件,请上传正确的图片类型",
    });
    return false;
  }
};

const uploadFile = (option: any) => {
  let formData = new FormData();
  formData.append("image", option.file);
  addImgApi(formData).then((res) => {
    imgList.value.push({
      url: res.msg,
    });
  });
};
/**
 * 表单
 */

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  name: "",
  preview: "",
  Github: "",
  gitee: "",
  position: "",
  description: "",
});

const checkPreview = (rule, value, callback) => {
  const regPreview = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
  if (regPreview.test(value)) {
    return callback();
  } else if (value == "") {
    return callback();
  }
  callback(new Error("请输入合法的网址格式"));
};

const checkGithub = (rule, value, callback) => {
  const regPreview = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
  if (regPreview.test(value)) {
    return callback();
  } else if (value == "") {
    return callback();
  }
  callback(new Error("请输入合法的网址格式"));
};
const checkGitee = (rule, value, callback) => {
  const regPreview = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
  if (regPreview.test(value)) {
    return callback();
  } else if (value == "") {
    return callback();
  }
  callback(new Error("请输入合法的网址格式"));
};
console.log(fileList, "fileList");

const rules = reactive({
  name: [
    { required: true, message: "请输入项目名称", trigger: "blur" },
    { min: 3, max: 8, message: "请输入3-8个字r 符", trigger: "blur" },
  ],
  preview: [
    { required: false, message: "请输入预览地址", trigger: "blur" },
    { validator: checkPreview, trigger: "blur" },
  ],
  Github: [
    { required: false, message: "请输入预览地址", trigger: "blur" },
    { validator: checkGithub, trigger: "blur", required: false },
  ],
  gitee: [
    { required: false, message: "请输入预览地址", trigger: "blur" },
    { validator: checkGitee, trigger: "blur" },
  ],
  position: [{ required: false, message: "请输入预览地址", trigger: "blur" }],
  description: [{ required: true, message: "请输入8-15个字符", trigger: "blur" }],
});

// {
//   "authorId": 0,
//   "createTime": 0,
//   "description": "",
//   "id": 0,
//   "linkGitee": "",
//   "linkGithub": "",
//   "name": "",
//   "preview": "",
//   "status": true,
//   "urls": [
//     {
//       "id": 0,
//       "url": ""
//     }
//   ]
// }

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      let data = {
        description: ruleForm.description,
        linkGitee: ruleForm.gitee,
        linkGithub: ruleForm.github,
        name: ruleForm.name,
        preview: ruleForm.preview,
        urls: imgList.value,
      };
      updateWorkApi(data).then((res) => {
        console.log(res, "上传");
        if (res.code == 200) {
          isShowDrawer.value = false;
          ElMessage({
            type: "success",
            message: "上传作品成功",
          });
          /**
           * 1.关闭drawer页面
           * 2.父组件重新请求数据
           */
          setTimeout(() => {
            isShowDrawer.value = false;
          }, 800);
          emit("handle");
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
defineExpose({ isShowDrawer });
</script>
<style lang="scss" scoped>
$font-family: "Comic Sans MS", cursive;
:deep(.el-drawer__body) {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: beige;
}
.title {
  color: burlywood;
  font-size: x-large;
  font-family: $font-family;
}
.tip {
  display: flex;
  justify-content: center;
  color: red;
  font-family: $font-family;
}
.upload {
  position: relative;
  left: 3%;
  margin: 10px;
}
</style>
