<template>
  <div class="articleList">
    <transition-group name="list">
      <div
        v-for="item in articleData.articleList"
        :key="item.id"
        @click="goArticleInfo(item.id)"
      >
        >
        <div class="article">
          <h2>{{ item.title }}</h2>
          <span style="font-size: 20px">{{
            day(item.createTime).format("YYYY-MM-DD")
          }}</span>
          <div class="body_html" v-html="item.summary"></div>
          <div class="footer">
            <div class="tag">
              <el-tag type="success" v-for="tag in item.tags" :key="tag.tagId">{{
                tag.tagName
              }}</el-tag>
            </div>
            <div class="view">
              <div style="display: flex">
                <span>阅读数:</span>

                <span>{{ item.viewCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <el-pagination
      style="justify-content: center; margin: 20px"
      hide-on-single-page
      v-model:currentPage="pageParams.page"
      v-model:page-size="pageParams.pageSize"
      layout="prev, pager, next, jumper"
      :total="articleData.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { getArticleApi } from "@/api";
import { ref, onMounted, reactive } from "vue";
import { getPermsApi, getMenuApi, getUserApi } from "@/api";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
const $articleList = ref(null);
const router = useRouter();
let articleData = reactive({
  articleList: [],
  total: Number(""),
});
let pageParams = reactive({
  page: 1,
  pageSize: 15,
});
const userStore = useUserStore();
const articleList = () => {
  return getArticleApi(pageParams).then((res) => {
    if (res.code == 200) {
      articleData.articleList = res.data.data;
      articleData.total = res.data.total;
    }
  });
};
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
});
onMounted(() => {
  articleList();
});
/**
 * 分页查询
 */

const handleCurrentChange = (val: number) => {
  pageParams.page = val;
  articleList();
  scrollTop();
};
const scrollTop = (selector) => {
  let element = (selector && document.querySelector(selector)) || window;
  element.scrollTo(0, 0);
};
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
  color: #ffff;
  height: 260px;
  font-family: "Comic Sans MS", cursive;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  background-image: linear-gradient(to right, #acb6e5, #86fde8);
  .body_html {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-indent: 2em;
    font-size: 18px;
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
        font-size: 20px;
        color: #2b4a48;
      }
    }
  }
  .icon {
    color: rgb(202, 158, 158);
  }
}
</style>
