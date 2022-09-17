import { defineStore } from "pinia";
import { recommendArticlesApi } from "@/api";
import { IcurrentArticle } from "@/model/article";
export const useArticleStore = defineStore("article", {
  state: () => ({
    recommendArticles: [],
    currentAuthorArticles: {} as IcurrentArticle,
  }),
  getters: {},
  actions: {
    // 获取推荐文章
    async getRecommendArticle() {
      const res = await recommendArticlesApi();
      if (res.code == 200) {
        this.$state.recommendArticles = res.data as unknown as [];
      }
    },
  },
});
