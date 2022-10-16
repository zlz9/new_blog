<template>
  <div class="box">
    <el-card style="height: 100%">
      <div class="user">
        <div class="user_avator">
          <img :src="userDetails.userInfo.avator" alt="" />
          <div class="user_name">{{ userDetails.userInfo.nickName }}</div>
        </div>
        <div class="motto">座右铭：每一次失败都是上帝在考验你是否真的热爱</div>
      </div>
      <div class="user_details_tag">
        <div class="user_details">
          <div class="status">
            账号状态：<span class="mark">{{ userDetails.status ? "正常" : "锁定" }}</span>
          </div>
          <div class="article_count">
            {{ userDetails.userInfo.nickName }}的文章数：<span class="mark">{{
              userDetails.articleCount
            }}</span>
          </div>
          <div class="work_count">
            {{ userDetails.userInfo.nickName }}的作品数：<span class="mark">{{
              userDetails.workCount
            }}</span>
          </div>
          <div class="tool_count">
            {{ userDetails.userInfo.nickName }}的工具：<span class="mark">{{
              userDetails.toolCount
            }}</span>
          </div>
          <div class="role">
            {{ userDetails.userInfo.nickName }}的角色：<span class="mark">{{
              userRole
            }}</span>
          </div>
          <div class="email">
            {{ userDetails.userInfo.nickName }}的邮箱：<span class="mark">{{
              userDetails.email
            }}</span>
          </div>
        </div>
        <div class="tags">
          <h3>{{ userDetails.userInfo.nickName }} 常用标签</h3>
          <div style="display: flex">
            <div
              class="tag_details"
              v-for="(item, index) in userDetails.tag.slice(0, 5)"
              :key="item.tagId"
            >
              <el-avatar :size="50" shape="square" :src="item.tagCover" />
            </div>
          </div>
        </div>
      </div>
      <div class="user_option">
        <div>
          <el-button @click="vip(userDetails.userInfo.id, 3)">设为vip</el-button>
          <el-button @click="user(userDetails.userInfo.id, 4)">设为普通用户</el-button>
          <el-button @click="admin(userDetails.userInfo.id, 2)">设为管理员</el-button>
          <el-button @click="lock(userDetails.userInfo.id)">强制下线并锁定</el-button>
          <el-button @click="unlock(userDetails.userInfo.id)">解锁用户</el-button>
          <el-button @click="reloadPwd(userDetails.userInfo.id)">重置密码</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { setRoleApi, reloadPwdApi } from "@/api";
import { ref, reactive, watch } from "vue";
import { userDetailsApi, lockUserApi, unlockUserApi } from "@/api";
import { ElMessage } from "element-plus";
const route = useRoute();
const userId = route.query.id;
let userRole = ref();
let userDetails = reactive({
  userInfo: {},
  tag: [],
  status: "",
  articleCount: "",
  email: "",
  role: Number(""),
  toolCount: "",
  workCount: "",
});

//重置用户密码
const reloadPwd = (id) => {
  reloadPwdApi(id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: `${res.msg}`,
        type: "success",
      });
    }
  });
};

const lock = (id) => {
  lockUserApi(id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: `${res.msg}`,
        type: "success",
      });
    }
  });
};
const unlock = (id) => {
  unlockUserApi(id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: `${res.msg}`,
        type: "success",
      });
    }
  });
};
const vip = (id, role) => {
  setRoleApi({ id, role }).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: `${res.msg}`,
        type: "success",
      });
    }
  });
};
const user = (id, role) => {
  setRoleApi({ id, role }).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: `${res.msg}`,
        type: "success",
      });
    }
  });
};
const admin = (id, role) => {
  setRoleApi({ id, role }).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: `${res.msg}`,
        type: "success",
      });
    }
  });
};
userDetailsApi(userId).then((res) => {
  if (res.code == 200) {
    userDetails.status = res.data.status;
    userDetails.userInfo = res.data.userInfo;
    userDetails.articleCount = res.data.articleCount;
    userDetails.email = res.data.email;
    userDetails.role = res.data.role;
    userDetails.toolCount = res.data.toolCount;
    userDetails.workCount = res.data.workCount;
    userDetails.tag = res.data.tagVos;
  }
});
watch(userDetails, () => {
  switch (userDetails.role) {
    case 1:
      userRole.value = "超级管理员";
      break;
    case 2:
      userRole.value = "管理员";
      break;
    case 3:
      userRole.value = "vip";
      break;
    case 4:
      userRole.value = "普通用户";
      break;
    default:
      break;
  }
});
console.log(userDetails.status, "status");
</script>

<style lang="scss" scoped>
$font-family: "Comic Sans MS", cursive;
.box {
  width: 100%;
  height: 600px;
  .user {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .user_avator {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px;
      img {
        border-radius: 50%;
        width: 200px;
        height: 200px;
      }
      .user_name {
        font-size: 18px;
        color: #273a4a;
        font-weight: bold;
        font-family: $font-family;
      }
    }
    .motto {
      width: 200px;
      text-indent: 2em;
      font-size: 25px;
      font-family: $font-family;
    }
  }
  .user_details_tag {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    margin: 10px;
    .user_details {
      font-family: $font-family;
      .mark {
        font-weight: bolder;
        color: #1caca0;
      }
    }
  }
  .tags {
    .tag_details {
      margin: 10px;
    }
  }
}
</style>
