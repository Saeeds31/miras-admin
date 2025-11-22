<template>
    <div class="p-4">
        <b-card title="ایجاد گالری جدید">
            <b-form @submit.prevent="submitForm">
                <b-row>
                    <!-- Title -->
                    <b-col cols="12" md="12">
                        <b-form-group label="عنوان" label-for="title">
                            <b-form-input id="title" v-model="form.title" :state="!errors.title"
                                placeholder="عنوان گالری" />
                            <b-form-invalid-feedback v-if="errors.title">{{ errors.title[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="12">
                        <b-form-group label="تصویر (URL)">
                            <VueFileAgent :multiple="true" @select="imageLoaded" :maxFiles="10" accept=".jpg,.png"
                                theme="grid" deletable sortable />
                            <b-form-invalid-feedback v-if="errors.image">{{ errors.images[0]
                            }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-row>
                <div class="mt-3">
                    <b-button v-if="checkPermission(['gallery_store'])" :disabled="loader" type="submit"
                        variant="primary">ذخیره</b-button>
                </div>
            </b-form>
        </b-card>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { BForm, BFormGroup, BFormInput, BFormTextarea, BButton, BCard, BRow, BCol, BFormInvalidFeedback } from 'bootstrap-vue-3'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import { useAdmin } from '@/stores/modules/admin';
const store = useAdmin();
let loader = ref(false);
const checkPermission = store.checkPermission;
const form = reactive({
    title: '',
    images: [],
})
const errors = reactive({})
function imageLoaded(files) {
    let images = [];
    for (let i = 0; i < files.length; i++) {
        images.push(files[i].file)
    }
    form.images = images
}
const submitForm = async () => {
    console.log(form.images);
    loader.value = true;
    Object.keys(errors).forEach(key => delete errors[key])
    try {
        const formData = new FormData()
        formData.append("title", form.title ?? '')
        form.images.forEach((image, index) => {
            formData.append(`images[]`, image)
        })
        await axios.post('/galleries', formData)
        toast.success('گالری با موفقیت ذخیره شد ✅')
    } catch (err) {
        if (err.response && err.response.status === 422) {
            Object.assign(errors, err.response.data.errors)
            toast.error('لطفاً خطاهای فرم را بررسی کنید ❌')
        } else {
            toast.error('خطا در ارسال اطلاعات ❌')
        }
    } finally {
        loader.value = false;
    }
}
</script>