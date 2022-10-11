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
      userInfo: {
        avator:
          "http://qiniu.zhoulizheng.cn/43507260-9412-4a12-88f4-eddb2c3a858f.jpg",
        age: 22,
        birthday: "",
        email: "",
        motto: "",
        nickName: "",
        phone: "",
        sex: "",
        userName: "",
      } as any,
    };
  },
  getters: {},
  actions: {
    async getMenu() {
      const res = await getMenuApi();
      if (res.code == 200) {
        this.menu = (res.data as unknown as Array<ImenuItem>) || [];
      }
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
