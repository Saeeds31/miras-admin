<template>
  <div class="container mt-4">

    <!-- فیلتر -->
    <div class="card mb-3">
      <div class="card-body">
        <form @submit.prevent="getGalleries">
          <div class="row g-2">
            <div class="col-md-4">
              <input v-model="filters.title" type="text" class="form-control" placeholder="جستجو بر اساس عنوان" />
            </div>
            <div class="col-md-2">
              <button class="btn btn-primary w-100" type="submit">جستجو</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- دکمه افزودن -->
    <div class="mb-3 text-end">
      <router-link v-if="checkPermission(['gallery_store'])" to="/Galleries/create" class="btn btn-success">
        افزودن گالری
      </router-link>
    </div>

    <!-- جدول -->
    <div class="card">
      <div class="card-body">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">در حال بارگذاری...</span>
          </div>
        </div>

        <div class="table-box" v-else>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>عنوان</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody v-if="Galleries">
              <tr v-for="gallery in Galleries" :key="gallery.id">
                <td>{{ gallery.id }}</td>
                <td>{{ gallery.title }}</td>
                <td>
                  <router-link v-if="checkPermission(['gallery_update'])" :to="`/galleries/${gallery.id}/edit`"
                    class="btn btn-sm btn-warning me-2">
                    ویرایش
                  </router-link>
                  <button class="btn btn-sm btn-danger" v-if="checkPermission(['gallery_delete'])"
                    @click="deletegallery(gallery.id)">
                    حذف
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useAdmin } from '@/stores/modules/admin';
const store = useAdmin();
const checkPermission = store.checkPermission;
const Galleries = ref(null);
const loading = ref(false);
const filters = ref({ title: "" });
let currentUrl = "/galleries";
async function getGalleries(url) {
  loading.value = true;
  try {
    const { data } = await axios.get(url, { params: filters.value });
    Galleries.value = data.data;

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};


const deletegallery = (id) => {
  Swal.fire({
    title: "حذف گالری",
    text: "آیا مطمئن هستید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله، حذف شود",
    cancelButtonText: "انصراف",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`/galleries/${id}`);
        Swal.fire("موفق", "گالری حذف شد", "success");
        getGalleries(currentUrl);
      } catch (err) {
        Swal.fire("خطا", "برای این گالری مقاله ثبت شده و قابل حذف نیست", "error");
      }
    }
  });
};

onMounted(() => {
  getGalleries(currentUrl);
});
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>