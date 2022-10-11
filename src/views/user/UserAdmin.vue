<template>
  <!-- 用户管理块 -->
  <UserSearch />
  <div>
    <el-row :gutter="20">
      <el-col :span="4" class="user" v-for="(item, index) in userInfo" :key="item.id">
        <img v-lazy="item.avator" alt="" @click="goUserInfo(item.id)" />
        <div class="name">{{ item.nickName }}</div>
      </el-col>
    </el-row>
    <h3 style="color: azure; text-align: center">用户黑名单</h3>
    <el-divider />
    <el-row :gutter="20">
      <el-col :span="4" class="user" v-for="(item, index) in lockedUser" :key="item.id">
        <img v-lazy="item.avator" alt="" @click="goUserInfo(item.id)" />
        <div class="name">{{ item.nickName }}</div>
      </el-col>
    </el-row>
  </div>

  <div></div>
</template>

<script setup lang="ts">
import { getAllUserInfoApi, getLockedApi } from "@/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let page = {
  page: 1,
  pageSize: 20,
};
let userInfo = ref();
let lockedUser = ref();
getLockedApi().then((res) => {
  lockedUser.value = res.data;
});

getAllUserInfoApi(page).then((res) => {
  if (res.code == 200) {
    userInfo.value = res.data;
  }
});

const goUserInfo = (id) => {
  router.push({ path: "/user/details", query: { id: id } });
};
</script>

<style lang="scss" scoped>
$font-family: "Comic Sans MS", cursive;
.user {
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 10px;
    &:hover {
      width: 205px;
      height: 205px;
    }
  }
  .name {
    text-align: center;
    color: #d5dee5;
    font-size: 20px;
    font-family: $font-family;
  }
}
</style>
