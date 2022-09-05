import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    perms: [],
    menu: [],
    userInfo: {},
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "token",
        storage: localStorage,
      },
      {
        key: "perms",
        storage: localStorage,
      },
      {
        key: "menu",
        storage: localStorage,
      },
    ],
  },
});
