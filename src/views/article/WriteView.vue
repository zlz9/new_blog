<template>
  <div class="write_article">
    <div class="title">
      <div class="title">did you study today</div>
    </div>
    <DialogView ref="$dialog" :articleBody="articleBody"></DialogView>
    <v-md-editor
      v-model="articleBody.text"
      height="800px"
      @save="save"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
    ></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import DialogView from "@/components/dialog/DialogView.vue";
import { addImgApi, articleInfo } from "@/api";
import { useRoute } from "vue-router";
const route = useRoute();
// 文章id
const id = route.query.id;
interface IarticleBody {
  text: string;
  html: string;
  title: string;
  summary: string;
}
const $dialog = ref<InstanceType<typeof DialogView> | null>(null);
const articleBody = reactive<IarticleBody>({
  text: "",
  html: "",
  title: "",
  summary: "",
});
console.log(articleBody, "articleBoddy");

// const articleHead = reactive<IarticleHead>({});
const save = (text: string, html: string) => {
  $dialog.value.dialogVisible = true;
  articleBody.text = text;
  articleBody.html = html;
};
console.log(articleBody, "articleBody");

const handleUploadImage = (event, insertImage, files) => {
  for (let i in files) {
    const formData = new FormData();
    formData.append("image", files[i]);
    addImgApi(formData).then(
      (response) => {
        insertImage({
          url: response.msg,
          width: "auto",
          height: "auto",
          desc: "BLOG",
        });
      },
      (error) => {
        console.log("请求失败了", error.message);
      }
    );
  }
};
/**
 * 查询文章赋值给article
 */
if (id) {
  articleInfo(id).then((res) => {
    articleBody.text = res.data.mdBody;
    articleBody.html = res.data.htmlBody;
    articleBody.title = res.data.title;
    articleBody.summary = res.data.summary;
    console.log(res, "article");
  });
}
</script>

<style scoped lang="scss">
.write_article {
  .title {
    color: aliceblue;
    text-align: center;
    font-size: 50px;
    margin: 10px;
    font-family: "Comic Sans MS", cursive;
  }
}
</style>
