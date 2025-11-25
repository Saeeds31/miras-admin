<template>
    <div class="p-4">
        <b-card title="ایجاد مقاله جدید">
            <b-form @submit.prevent="submitForm">
                <b-row>
                    <!-- Title -->
                    <b-col cols="12" md="6">
                        <b-form-group label="عنوان" label-for="title">
                            <b-form-input id="title" v-model="form.title" :state="!errors.title"
                                placeholder="عنوان مقاله" />
                            <b-form-invalid-feedback v-if="errors.title">{{ errors.title[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>

                    <!-- Slug -->
                    <b-col cols="12" md="6">
                        <b-form-group label="Slug" label-for="slug">
                            <b-form-input id="slug" v-model="form.slug" :state="!errors.slug"
                                placeholder="slug مقاله" />
                            <b-form-invalid-feedback v-if="errors.slug">{{ errors.slug[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="دسته‌بندی " label-for="category_ids">
                            <Treeselect id="category_ids" :multiple="true" v-model="form.category_ids"
                                :normalizer="normalizer" :options="parentOptions" placeholder="انتخاب دسته‌بندی "
                                :clearable="true" :valueConsistsOf="'ALL'" />
                            <b-form-invalid-feedback v-if="errors.category_ids">{{ errors.category_ids[0]
                            }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>

                    <b-col cols="12" md="6">
                        <b-form-group label="مرتبط به شهر " label-for="city_id">
                            <Treeselect id="city_id" :multiple="false" v-model="form.city_id"
                                :normalizer="normalizerCity" :options="cities" placeholder="انتخاب شهر "
                                :clearable="true" :valueConsistsOf="'ALL'" />
                            <b-form-invalid-feedback v-if="errors.city_id">{{ errors.city_id[0]
                            }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>

                    <b-col cols="12" md="6">
                        <b-form-group label="مرتبط به گالری " label-for="gallery_id">
                            <Treeselect id="gallery_id" :multiple="false" v-model="form.gallery_id"
                                :normalizer="normalizerGallery" :options="galleries" placeholder="انتخاب گالری "
                                :clearable="true" :valueConsistsOf="'ALL'" />
                            <b-form-invalid-feedback v-if="errors.gallery_id">{{ errors.gallery_id[0]
                            }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>

                    <!-- Read Time -->
                    <b-col cols="12" md="6">
                        <b-form-group label="مدت زمان مطالعه ">
                            <b-form-input type="number" v-model="form.read_time" :state="!errors.read_time"
                                placeholder="مثال: 5" />
                            <b-form-invalid-feedback v-if="errors.read_time">{{ errors.read_time[0]
                                }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>

                    <!-- Image -->
                    <b-col cols="12" md="12">
                        <b-form-group label="تصویر (URL)">
                            <VueFileAgent @select="imageLoaded" :maxFiles="1" accept=".pdf,.jpg,.png" theme="grid"
                                deletable sortable />
                            <b-form-invalid-feedback v-if="errors.image">{{ errors.image[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                    <!-- Short Description -->
                    <b-col cols="12">
                        <b-form-group label="توضیح کوتاه">
                            <b-form-textarea v-model="form.short_description" :state="!errors.short_description"
                                rows="2" />
                            <b-form-invalid-feedback v-if="errors.short_description">{{ errors.short_description[0]
                                }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>

                    <!-- Description (CKEditor) -->
                    <b-col cols="12">
                        <b-form-group label="توضیحات کامل">
                            <Editor v-model="form.description" />
                            <b-form-invalid-feedback v-if="errors.description">{{ errors.description[0]
                                }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>

                    <!-- Meta Title -->
                    <b-col cols="12" md="6">
                        <b-form-group label="Meta Title">
                            <b-form-input v-model="form.meta_title" :state="!errors.meta_title" />
                            <b-form-invalid-feedback v-if="errors.meta_title">{{ errors.meta_title[0]
                                }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>

                    <!-- Meta Description -->
                    <b-col cols="12" md="6">
                        <b-form-group label="Meta Description">
                            <b-form-input v-model="form.meta_description" :state="!errors.meta_description" />
                            <b-form-invalid-feedback v-if="errors.meta_description">{{ errors.meta_description[0]
                                }}</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="ثبت در بخش اخبار" label-for="is_news">
                            <b-form-checkbox id="is_news" v-model="form.is_news" :state="errors.is_news ? false : null"
                                :true-value="1" :false-value="0">
                                فعال
                            </b-form-checkbox>
                            <small v-if="errors.is_news" class="text-danger">{{ errors.is_news[0] }}</small>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group label="مشاهده در صفحه اصلی" label-for="home_page">
                            <b-form-checkbox id="home_page" v-model="form.home_page"
                                :state="errors.home_page ? false : null" :true-value="1" :false-value="0">
                                فعال
                            </b-form-checkbox>
                            <small v-if="errors.home_page" class="text-danger">{{ errors.home_page[0] }}</small>
                        </b-form-group>
                    </b-col>
                </b-row>

                <div class="mt-3">
                    <b-button v-if="checkPermission(['article_store'])" :disabled="loader" type="submit"
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
import Treeselect from 'vue3-treeselect'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import Editor from '@/components/shared/editor.vue';
import { useAdmin } from '@/stores/modules/admin';
const store = useAdmin();
let loader = ref(false);
const checkPermission = store.checkPermission;
const form = reactive({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    meta_title: '',
    meta_description: '',
    read_time: '',
    is_news: false,
    home_page: false,
    image: '',
    city_id: null,
    gallery_id: null,
    category_ids: []
})
const errors = reactive({})
function imageLoaded(files) {
    form.image = files[0].file
}
const normalizer = (node) => {
    // تبدیل کلیدها به فرمت استاندارد کامپوننت
    return {
        id: node.id,
        label: node.title,
        children: node.children
    }
}
const normalizerCity = (node) => {
    return {
        id: node.id,
        label: node.name,
    }
}
const normalizerGallery = (node) => {
    return {
        id: node.id,
        label: node.title,
    }
}
const parentOptions = ref([])
const cities = ref([])
const galleries = ref([])
function getParentOption() {
    axios.get("/article-categories-by-child").then((res) => {
        parentOptions.value = res.data.data
    })
    axios.get('/all-cities').then((res) => {
        cities.value = res.data.data
    })
    axios.get('/all-galleries').then((res) => {
        galleries.value = res.data.data
    })
}
getParentOption()
const submitForm = async () => {
    loader.value = true;
    Object.keys(errors).forEach(key => delete errors[key])
    try {
        const formData = new FormData()
        for (const key in form) {
            if (key == 'is_news' || key == 'home_page') formData.append(key, Number(form[key]));
            else if (key != 'category_ids')
                formData.append(key, form[key] ?? '')
        }
        form.category_ids.forEach((id, index) => {
            formData.append(`category_ids[]`, id)
        })
        await axios.post('/articles', formData)
        toast.success('مقاله با موفقیت ذخیره شد ✅')
        Object.keys(form).forEach(key => (form[key] = key))
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