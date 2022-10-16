<template>
  <div>
    <el-drawer direction="ttb" size="60%" v-model="upload">
      <div>
        <!-- 上传头像 -->
        <div class="upload">
          <el-upload
            ref="$upload"
            list-type="picture-card"
            :auto-upload="false"
            :http-request="uploadFile"
            style="
              display: flex;
              justify-content: center;
              position: relative;
              left: 30px;
              margin: 10px;
            "
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
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="ruleForm.nickName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="ruleForm.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="座右铭" prop="motto">
            <el-input v-model="ruleForm.motto" autocomplete="off" type="textarea" />
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
import { ref, reactive, defineExpose, defineEmits } from "vue";
import type { UploadFile } from "element-plus";
import { Plus, ZoomIn } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import { updateUserApi, addImgApi } from "@/api";
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
      ruleForm.avator = res.msg;
    })
    .then(() => {
      updateUserInfo();
    });
};

const updateUserInfo = () => {
  return updateUserApi(ruleForm).then((res) => {
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
};

/**
 * 表单
 */
const ruleFormRef = ref<FormInstance>();

let ruleForm = reactive({
  userName: "",
  nickName: "",
  phone: "",
  avator: "",
  motto: "",
});

const checkPhone = (rule, value, callback) => {
  const regPhone = /0?(13|14|15|18|17)[0-9]{9}/;
  if (regPhone.test(value)) {
    return callback();
  } else if (value == "") {
    callback();
  }
  callback(new Error("请输入合法的手机号"));
};

const rules = reactive({
  userName: [
    {
      min: 3,
      max: 5,
      trigger: "blur",
      required: false,
      message: "用户名在3-5个字符",
    },
  ],
  nickName: [
    {
      min: 3,
      max: 7,
      trigger: "blur",
      required: false,
      message: "昵称在3-7个字符",
    },
  ],
  phone: [{ trigger: "blur", required: false, validator: checkPhone }],
  motto: [
    {
      trigger: "blur",
      required: false,
      min: 10,
      max: 50,
      message: "请输入10-50字符",
    },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      $upload.value.submit();
      updateUserInfo();
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
:deep(.el-drawer__body) {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
