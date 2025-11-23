<template>
  <div class="container py-4">
    <b-card>
      <h5 class="mb-3">ویرایش گالری</h5>
      <b-form @submit.prevent="handleSubmit">
        <b-row>
          <b-col cols="12" md="12">
            <b-form-group label="عنوان" label-for="title">
              <b-form-input id="title" v-model="form.title" :state="!errors.title" placeholder="عنوان گالری" />
              <b-form-invalid-feedback v-if="errors.title">{{ errors.title[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="12">
            <b-form-group label="تصویر (URL)">

              <VueFileAgent @update:rawModelValue="imageDeleted" @select="imagesLoaded"
                v-model:rawModelValue="oldImages" :multiple="true" accept=".jpg,.png,.pdf" theme="grid" deletable
                sortable />
              <b-form-invalid-feedback v-if="errors.image">{{ errors.images[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <div class="mt-3">
          <b-button v-if="checkPermission(['gallery_update'])" type="submit" :disabled="loader" variant="primary">ویرایش
            گالری</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { BForm, BFormGroup, BFormInput, BButton, BCard, BRow, BCol } from 'bootstrap-vue-3'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import { useRoute } from 'vue-router'
import { useAdmin } from '@/stores/modules/admin';
let loader = ref(false);
const store = useAdmin();
const checkPermission = store.checkPermission;
const route = useRoute();
const oldImages = ref([]);
const form = reactive({
  title: '',
  images: [],
})
let backupImages = ref();
let deleted_images = ref([]);
const errors = reactive({})
function imageDeleted(files) {
  backupImages.value.forEach(
    (oldimg, index) => {
      let finded = files.find((newImg) => newImg.id == oldimg.id);
      if (!finded) {
        deleted_images.value.push(oldimg.id);
        backupImages.value.splice(index, 1)
      }
    }
  );
}
onMounted(async () => {
  try {
    // GET اطلاعات مقاله
    const res = await axios.get(`/galleries/${route.params.id}`)
    form.title = res.data.data.title;
    let images = []
    backupImages.value = res.data.data.images;
    res.data.data.images.forEach(img => {
      images.push({
        name: img.image.split('/').pop(),
        size: 0,
        id: img.id,
        type: 'image/jpeg',
        ext: img.image.split('.').pop(),
        url: `${baseImageAddress}${img.image}`,
      })
    });
    oldImages.value = images;
  } catch (err) {
    console.log(err);
    toast.error('خطا در دریافت اطلاعات گالری ❌')
  }
})
function imagesLoaded(files) {
  form.images = files.map(f => f.file)
}
const handleSubmit = async () => {
  loader.value = true;
  Object.keys(errors).forEach(k => delete errors[k])
  try {
    const formData = new FormData()
    for (const key in form) {
      if (key != 'images') formData.append(key, form[key])
    }
    formData.append("_method", "PUT");
    if (deleted_images.value.length) {
      deleted_images.value.forEach(id => {
        formData.append("removed_image_ids[]", id)
      })
    };
    form.images.forEach((image, index) => {
      formData.append(`new_images[]`, image)
    })
    await axios.post(`/galleries/${route.params.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    toast.success('گالری با موفقیت ویرایش شد ✅');
  } catch (err) {
    if (err.response?.status === 422) {
      Object.assign(errors, err.response.data.errors)
      toast.error('خطاهای فرم را بررسی کنید ❌')
    } else {
      toast.error('خطا در ارسال اطلاعات ❌')
    }
  } finally {
    loader.value = false;
  }
}
</script>
