<script setup>
import Sidebar from './components/shared/sideBar.vue'
import Toolbar from './components/shared/toolBar.vue'
import axios from "axios";
import { getCookie } from "./tools/methods.js";
import { useAdmin } from '@/stores/modules/admin';

import { useRouter, useRoute } from "vue-router"
const router = useRouter();
const route = useRoute();
const store = useAdmin();
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push({ name: "login" }); // برو به صفحه لاگین
    }
    return Promise.reject(error);
  }
);
if (getCookie('token')) {
  axios.defaults.headers.common.Authorization = `Bearer ${getCookie('token')}`
  getBaseInfo();
} else {
  router.push("/login")
}
function getBaseInfo() {
  store.getAdminDetail();
}

</script>
<template>
  <div class="d-flex w-100">
    <Sidebar v-if="route.path != '/login'" />
    <div class="flex-grow-1" id="mainContent">
      <Toolbar v-if="route.path != '/login'" />
      <div class="pageContainer">
        <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<style>
div#mainContent {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-right: 250px;
}

@media (max-width:991px) {
  div#mainContent {
    margin-right: 0px;
    max-width: 100%;
  }

  nav#mainNavbar {
    padding-right: 48px !important;
    position: fixed;
    width: 100%;
    z-index: 999;
  }

  .pageContainer {
    padding-top: 64px;
  }
}
</style>