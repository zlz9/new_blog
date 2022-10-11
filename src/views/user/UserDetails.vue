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
          <div class="status">账号状态：{{ userDetails.status ? "正常" : "锁定" }}</div>
          <div class="article_count">
            {{ userDetails.userInfo.nickName }}的文章数：{{ userDetails.articleCount }}
          </div>
          <div class="work_count">
            {{ userDetails.userInfo.nickName }}的作品数：{{ userDetails.workCount }}
          </div>
          <div class="tool_count">
            {{ userDetails.userInfo.nickName }}的工具：{{ userDetails.toolCount }}
          </div>
          <div class="role">
            {{ userDetails.userInfo.nickName }}的角色：{{ userRole }}
          </div>
          <div class="email">
            {{ userDetails.userInfo.nickName }}的邮箱：{{ userDetails.email }}
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
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { setRoleApi } from "@/api";
import { ref, reactive, watch } from "vue";
import { userDetailsApi, lockUserApi, unlockUserApi } from "@/api";
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

const lock = (id) => {
  lockUserApi(id).then((res) => {
    console.log(res);
  });
};
const unlock = (id) => {
  unlockUserApi(id).then((res) => {
    console.log(res);
  });
};
const vip = (id, role) => {
  setRoleApi({ id, role }).then((res) => {
    console.log(res, "res");
  });
};
const user = (id, role) => {
  setRoleApi({ id, role }).then((res) => {
    console.log(res, "res");
  });
};
const admin = (id, role) => {
  setRoleApi({ id, role }).then((res) => {
    console.log(res, "res");
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
  }
  .tags {
    .tag_details {
      margin: 10px;
    }
  }
}
</style>
