<template>
  <div class="box">
    <el-row :gutter="20">
      <transition-group
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <el-col :span="6" v-for="item in tags" :key="item.tagId" class="col">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <img :src="item.tagCover" class="image" />
            <div style="padding: 14px">
              <span></span>
              <div class="bottom">
                <time class="time">{{ item.tagName }}</time>
                <el-button
                  :icon="Delete"
                  circle
                  v-if="userStore.userInfo.role == '超级管理员'"
                  @click="del(item.tagId)"
                />
                <el-button text class="button" @click="showArticleInfo(item.tagId)"
                  >查看详情</el-button
                >
              </div>
            </div>
          </el-card>
          <div
        /></el-col>
      </transition-group>
      <!-- 上传权限 -->
      <el-col :span="4" v-permission="userStore.userInfo.role">
        <el-card style="width: 322px; height: 225px; position: relative; top: 20px">
          <div
            class="plus"
            @click="showUpload"
            style="
              width: 100%;
              height: 100%;
              position: relative;
              font-size: 60px;
              right: 20px;
              bottom: 20px;
            "
          >
            <el-icon style="width: 100%; height: 100%" size="100"><Plus /></el-icon></div
        ></el-card>
      </el-col>
    </el-row>
    <!-- 上传标签 -->
    <UploadTag ref="$upload" @handle="refresh" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTagStore } from "@/store/tag";
import { getTag, delTag } from "@/api";
import { tag } from "@/model/tag";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
const userStore = useUserStore();
const router = useRouter();
const $upload = ref();
let tags = ref<tag[]>();
const tagStore = useTagStore();
const tagList = getTag().then((res) => {
  console.log(res);
  tags.value = res.data;
  tagStore.tagList = res.data as [];
});
const showArticleInfo = (id) => {
  router.push({ path: "/tagArticle", query: { id: id } });
};
// 展开上传按钮
const showUpload = () => {
  $upload.value.upload = true;
};
onMounted(() => {
  tagList;
});

const refresh = () => {
  // 再次请求数据
  getTag;
};
// 删除标签
const del = (id) => {
  delTag(id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      setTimeout(() => {
        getTag();
      }, 1000);
    }
  });
};
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
}
::v-deep .el-card,
.is-always-shadow {
  width: 100%;
  height: 100%;
}
.box {
  .col {
    margin-top: 20px;
    .time {
      font-size: 12px;
      color: #999;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .button {
      padding: 0;
      min-height: auto;
    }
    ::v-deep .image {
      width: 100%;
      height: 150px;
      display: block;
    }
  }
}
</style>
