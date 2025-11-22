import axios from "axios";
import { defineStore } from "pinia";

export const useAdmin = defineStore("admin", {
  state: () => ({
    admin: null,
    permissions: [],
  }),

  getters: {
    getAdmin: (state) => state.admin,
    getPermissions: (state) => state.permissions,
  },

  actions: {
    checkPermission(permissions, type) {
      let res = false;
      if (type == "or") {
        res = permissions.some((adminPer) =>
          this.permissions.includes(adminPer)
        );
      } else {
        res = permissions.every((adminPer) =>
          this.permissions.includes(adminPer)
        );
      }
      return res;
    },
    async getAdminDetail() {
      try {
        const { data } = await axios.get("/admin-info");
        this.admin = data.user;
        this.permissions = data.permissions;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
