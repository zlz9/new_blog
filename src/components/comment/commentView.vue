<template>
  <div class="comments">
    <!-- 发布评论 -->
    <div class="publish_comment">
      <el-card style="width: 1000px; position: relative; left: 10%">
        <div class="user_comment">
          <div class="userInfo">
            <el-avatar shape="square" :size="50" :src="userInfo.avatar"></el-avatar>
            <div class="nickName">{{ userInfo.nickName }}</div>
          </div>
          <div class="text_area">
            <!-- 评论框 -->
            <el-input v-model="comment" type="textarea" placeholder="发布您的评论" />
            <el-button
              style="position: relative; left: 85%; top: 5px"
              @click="confirmComment"
              >确认发布</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
    <!-- 评论组件 -->
    <el-divider> </el-divider>
    <div class="comment">
      <el-card>
        <div
          class="user_comments"
          v-for="(item, index) in commentList"
          :key="item.id"
          @click="replyComment(item.author.nickName, item.author.id, item.id)"
        >
          <div class="userInfo">
            <el-avatar shape="square" :size="30" :src="item.author.avator"></el-avatar>
            <div class="nickName">{{ item.author.nickName }}</div>
            <div class="time">
              {{ day(item.createDate).format("YYYY-MM-DD") }}
            </div>
          </div>
          <div class="content">{{ item.content }}</div>

          <!-- 二级评论 -->
          <template v-for="(subItem, index) in item.childrens" :key="subItem.id">
            <div class="sub_user_comments">
              <div class="userInfo">
                <div class="toUser">
                  {{ subItem.author.nickName }}-回复-{{ subItem.toUser.nickName }}
                </div>
                <el-avatar
                  shape="square"
                  :size="30"
                  :src="subItem.author.avator"
                ></el-avatar>
                <div class="nickName">{{ subItem.author.nickName }}</div>
                <div class="time">
                  {{ day(subItem.createDate).format("YYYY-MM-DD") }}
                </div>
              </div>
              <div class="content">{{ subItem.content }}</div>
            </div>
          </template>
        </div>
      </el-card>
    </div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-input v-model="replyParams.content" type="textarea"></el-input>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="(dialogVisible = false), submitReply()"
            >确认</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getArticleCommentApi, commentApi } from "@/api";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/user";
import { Icomment } from "@/model/comment";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
const comment = ref("");
const route = useRoute();
const articleId = route.query.id;
const userStore = useUserStore();

const dialogVisible = ref(false);
const dialogTitle = ref();
const userInfo = reactive({
  nickName: userStore.userInfo.nickName,
  avatar: userStore.userInfo.avator,
});
console.log(comment, "comment");

const confirmComment = () => {
  let commentParams = {
    articleId: articleId,
    content: comment.value,
  };
  // 一级评论
  return commentApi(commentParams).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: "评论成功",
        type: "success",
      });
      setTimeout(() => {
        getComment();
        comment.value = "";
      }, 800);
      console.log("发布成功");
    }
  });
};
let replyParams = reactive({
  articleId: articleId,
  content: "",
  level: 2,
  parentId: 0,
  toUserId: 0,
});

const replyComment = (name, id, pid) => {
  console.log("触发", name, id);
  dialogTitle.value = `回复--${name}☆*: .｡. o(≧▽≦)o .｡.:*☆`;
  dialogVisible.value = true;
  replyParams.parentId = pid;
  replyParams.toUserId = id;
};

const submitReply = () => {
  commentApi(replyParams).then((res) => {
    console.log(replyParams, "replyParams");
    if (res.code == 200) {
      ElMessage({
        message: "评论成功",
        type: "success",
      });
      setTimeout(() => {
        getComment();
        replyParams.content = "";
      }, 800);
      console.log(res, "二级评论");
    }
  });
};

let commentList = ref<Icomment>();
const getComment = () => {
  return getArticleCommentApi(articleId).then((res) => {
    if (res.code == 200) {
      commentList.value = res.data;
    }
    console.log(commentList, "评论");
  });
};
onMounted(() => {
  getComment();
});
</script>

<style scoped lang="scss">
$font-family: "Comic Sans MS", cursive;

:deep(.el-textarea__inner) {
  height: 50px;
}
.comments {
  position: relative;
  top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 1200px;
  left: 180px;
  .comment {
    width: 100%;
    .comment_info {
      justify-content: space-around;
      display: flex;
      .comment_detail {
        width: 90%;
        position: relative;
      }
    }
  }
  .user_comment {
    position: relative;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;

    .text_area {
      width: 800px;
    }
    .userInfo {
      width: 60px;
      .nickName {
        text-align: center;
        width: 60px;
      }
    }
  }
  .user_comments {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    .userInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .time {
      font-size: 5px;
    }
    .nickName {
      font-size: 13px;
      font-family: $font-family;
    }
    .content {
      display: flex;
      align-items: center;
      width: 80%;
      position: relative;
      font-family: $font-family;
    }
  }
  .sub_user_comments {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    left: 5%;
    margin-top: 10px;
    .toUser {
      font-size: 5px;
      margin: 5px;
    }
    .userInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
