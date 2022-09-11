import { ImenuItem } from "@/model/user";
import { getMenuApi } from "@/api";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      // hasChildren: [] as unknown as ImenuItem,
      // noChildren: [] as unknown as ImenuItem,
      token: "",
      perms: [],
      menu: [] as unknown as Array<ImenuItem>,
      userInfo: {},
    };
  },
  getters: {},
  actions: {
    async getMenu() {
      const res = await getMenuApi();
      if (res.code == 200) {
        this.menu = res.data as unknown as Array<ImenuItem>;
      }
      console.log(res, "res");
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
