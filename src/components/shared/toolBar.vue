<template>
  <b-navbar id="mainNavbar" variant="light" class="bg-white border-bottom px-3">
    <span></span>
    <b-navbar-nav class=" d-flex align-items-center">
      <!-- دکمه‌های اضافی -->
      <b-button variant="info" @click="router.go(-1)">
        <i class="bi-arrow-left"></i>
      </b-button>
      <b-button variant="outline-primary" class="me-2">
        <i class="bi-bell-fill"></i>
      </b-button>
      <b-button variant="outline-success" class="me-2">
        <i class="bi-gear-fill"></i>

      </b-button>
      <!-- Logout -->
      <b-button variant="danger" @click="logout">
        <i class="bi-box-arrow-left"></i>
      </b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script setup>
import { BNavbar, BNavbarBrand, BNavbarNav, BButton } from 'bootstrap-vue-3'
import { useRouter } from "vue-router"
import { deleteCookie } from '../../tools/methods';
import axios from 'axios';
import { toast } from 'vue3-toastify';
const router = useRouter();
const logout = () => {
  toast.success("شما با موفقیت از پنل ادمین خارج شدید")
  deleteCookie("token");
  axios.defaults.headers.common.Authorization = "Bearer ";
  router.push('/login');
}

</script>