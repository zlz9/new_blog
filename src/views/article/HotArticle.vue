<template>
  <transition-group name="list">
    <div
      v-for="item in articles"
      :key="item.id"
      @click="goArticleInfo(item.id)"
    >
      <div class="article">
        <h3>{{ item.title }}</h3>
        <span>{{ day(item.createTime).format("YYYY-MM-DD") }}</span>
        <div class="body_html" v-html="item.summary"></div>
        <div class="footer">
          <div class="tag">
            <el-tag type="success" v-for="tag in item.tags" :key="tag.tagId">{{
              tag.tagName
            }}</el-tag>
          </div>
          <div class="view">
            <div>
              <el-icon class="icon"><View /></el-icon><span>22</span>
            </div>
            <div>
              <el-icon class="icon"><Reading /></el-icon><span>33</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { getArticleApi } from "@/api";
import { ref, onMounted } from "vue";
import { getPermsApi, getMenuApi, getUserApi } from "@/api";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
const router = useRouter();
let articles = ref();

const userStore = useUserStore();
const articleList = getArticleApi().then((res) => {
  console.log(res);
  if (res.code == 200) {
    articles.value = res.data.data;
    console.log(articles.value);
  }
});
const goArticleInfo = (id) => {
  router.push({ path: "/article/info", query: { id } });
};
// 获取用户路由和权限
getPermsApi().then((res) => {
  userStore.perms = res.data;
});
// getMenuApi().then((res) => {
//   userStore.menu = res.data as [];
// });
// 获取用户信息
getUserApi().then((res) => {
  userStore.userInfo = res.data;
  console.log(res, "用户信息");
});
onMounted(() => {
  articleList;
});
</script>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.article {
  font-family: "Comic Sans MS", cursive;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(195, 209, 207);
  border-radius: 10px;
  background-image: linear-gradient(to top, #b3ffab 0%, #12fff7 100%);
  .body_html {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-indent: 2em;
  }
  .footer {
    display: flex;
    width: 100%;
    .tag {
      width: 80%;
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }
    .view {
      display: flex;
      height: 20px;
      width: 100px;
      justify-content: space-around;
      width: 20%;
      span {
        font-size: 12px;
        color: rgb(226, 35, 35);
      }
    }
  }
  .icon {
    color: rgb(240, 88, 88);
  }
}
</style>
