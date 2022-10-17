<template>
  <div class="box">
    <div class="userInfo">
      <el-card style="display: flex; flex-direction: column; align-items: center">
        <el-avatar shape="square" :size="100" fit="fill" :src="userInfo.avator" />
        <div class="nickName">{{ userInfo.nickName }}</div>
      </el-card>
      <el-divider />
      <el-card>
        <div class="motto">{{ userInfo.motto }}</div>
      </el-card>
      <el-divider />
      <!-- 文章推荐 -->
      <el-card>
        <div class="more_info">
          <el-table :data="articleList" @cell-dblclick="goInfo">
            <el-table-column prop="title" label="优质文章推荐" />
          </el-table>
        </div>
      </el-card>
    </div>
    <div class="article">
      <el-card class="head">
        <div class="title">{{ article.title }}</div>
        <div class="time">
          {{ day(article.createTime).format("YYYY-MM-DD") }}
        </div>
        <div class="summary">{{ article.summary }}</div>
      </el-card>
      <div>
        <v-md-preview-html
          :html="article.articleBody"
          preview-class="vuepress-markdown-body"
        ></v-md-preview-html>
      </div>
    </div>
  </div>
  <div class="comments" style="overflow: hidden">
    <comment-view></comment-view>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { articleInfo } from "@/api";
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useArticleStore } from "@/store/article";
const router = useRouter();
const route = useRoute();
const articleStore = useArticleStore();

/*
 *发送获取推荐文章
 */

articleStore.getRecommendArticle();

const goInfo = (row) => {
  console.log(row.id);

  router.push({ path: "/article/info", query: { id: row.id } });
};

const articleList = computed({
  get() {
    return articleStore.recommendArticles;
  },
});
watch(route, () => {
  getArticle();
});
/**
 * 获取文章详情
 */
let article = reactive({
  articleBody: "",
  title: "",
  summary: "",
  createTime: "",
});
let userInfo = reactive({
  nickName: "",
  avator: "",
  motto: "",
});
const getArticle = () => {
  articleInfo(route.query.id).then((res) => {
    if (res.code == 200) {
      article.articleBody = res.data.htmlBody;
      article.title = res.data.title;
      article.summary = res.data.summary;
      article.createTime = res.data.createTime;
      userInfo.nickName = res.data.userVo.nickName;
      userInfo.avator = res.data.userVo.avator;
      userInfo.motto = res.data.userVo.motto;
    }
  });
};
onMounted(() => {
  getArticle();
});
</script>

<style scoped lang="scss">
$bg-color: #213d5b;
$font-color: #ffff;
$font-family: "Comic Sans MS", cursive;
.box {
  display: flex;
  .userInfo {
    width: 15%;
    height: 200px;
    .motto {
      text-indent: 2em;
      font-family: $font-family;
    }
  }
  .article {
    width: 85%;
    .head {
      background: $bg-color;
      .title {
        color: $font-color;
        text-align: center;
        font-family: $font-family;
        font-size: 30px;
      }
      .time {
        color: $font-color;
        text-align: center;
        font-family: $font-family;
      }
      .summary {
        color: $font-color;
        text-align: center;
        font-family: $font-family;
      }
    }
  }
}

:deep .vuepress-markdown-body {
  display: "flex";
  min-height: 900px;
}
.nickName {
  font-family: $font-family;
  text-align: center;
  font-weight: 500;
}
</style>
