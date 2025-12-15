import { createRouter, createWebHistory } from "vue-router";
import login from "../views/login.vue";
import dashboard from "../views/dashboard/dashboard.vue";

const routes = [
  { path: "/login", name: "login", component: login },
  { path: "/dashboard", name: "dashboard", component: dashboard },
  {
    path: "/users",
    name: "users-list",
    component: () => import("@/views/users/User/list.vue"),
  },
  {
    path: "/users/detail/:id",
    name: "users-detail",
    component: () => import("@/views/users/User/detail.vue"),
  },

  {
    path: "/users/create",
    name: "users-create",
    component: () => import("@/views/users/User/create.vue"),
  },

  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: () => import("@/views/users/User/edit.vue"),
  },
  {
    path: "/users/:id/addresses",
    name: "users-addresses",
    component: () => import("@/views/users/Address/list.vue"),
  },
  {
    path: "/users/:id/addresses/create",
    name: "users-addresses-create",
    component: () => import("@/views/users/Address/create.vue"),
  },
  {
    path: "/users/:id/addresses/:address/edit",
    name: "users-addresses-edit",
    component: () => import("@/views/users/Address/edit.vue"),
  },
  {
    path: "/users/managers",
    name: "users-managers",
    component: () => import("@/views/users/Manager/list.vue"),
  },
  {
    path: "/users/managers/create",
    name: "users-managers-create",
    component: () => import("@/views/users/Manager/create.vue"),
  },
  {
    path: "/users/managers/:id/edit",
    name: "users-managers-edit",
    component: () => import("@/views/users/Manager/edit.vue"),
  },

  {
    path: "/users/roles",
    name: "users-roles",
    component: () => import("@/views/users/Role/list.vue"),
  },
  {
    path: "/users/roles/create",
    name: "users-roles-create",
    component: () => import("@/views/users/Role/create.vue"),
  },
  {
    path: "/users/roles/:id/edit",
    name: "users-roles-edit",
    component: () => import("@/views/users/Role/edit.vue"),
  },

  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/settings/index.vue"),
  },

  {
    path: "/content/sliders",
    name: "content-sliders",
    component: () => import("@/views/content/Slider/list.vue"),
  },

  {
    path: "/content/sliders/create",
    name: "content-sliders-create",
    component: () => import("@/views/content/Slider/create.vue"),
  },
  {
    path: "/content/sliders/:id/edit",
    name: "content-sliders-edit",
    component: () => import("@/views/content/Slider/edit.vue"),
  },

  {
    path: "/content/menus",
    name: "content-menus",
    component: () => import("@/views/content/Menu/list.vue"),
  },

  {
    path: "/content/menus/create",
    name: "content-menus-create",
    component: () => import("@/views/content/Menu/create.vue"),
  },

  {
    path: "/content/menus/:id/edit",
    name: "content-menus-edit",
    component: () => import("@/views/content/Menu/edit.vue"),
  },
  {
    path: "/content/banners",
    name: "content-banners",
    component: () => import("@/views/content/Banner/list.vue"),
  },

  {
    path: "/content/banners/create",
    name: "content-banners-create",
    component: () => import("@/views/content/Banner/create.vue"),
  },

  {
    path: "/content/banners/:id/edit",
    name: "content-banners-edit",
    component: () => import("@/views/content/Banner/edit.vue"),
  },

  {
    path: "/articles/list",
    name: "articles-list",
    component: () => import("@/views/articles/Article/list.vue"),
  },
  {
    path: "/articles/create",
    name: "articles-create",
    component: () => import("@/views/articles/Article/create.vue"),
  },
  {
    path: "/articles/:id/edit",
    name: "articles-edit",
    component: () => import("@/views/articles/Article/edit.vue"),
  },

  {
    path: "/galleries/list",
    name: "galleries-list",
    component: () => import("@/views/galleries/list.vue"),
  },
  {
    path: "/galleries/create",
    name: "galleries-create",
    component: () => import("@/views/galleries/create.vue"),
  },
  {
    path: "/galleries/:id/edit",
    name: "galleries-edit",
    component: () => import("@/views/galleries/edit.vue"),
  },
  {
    path: "/articles/categories",
    name: "articles-categories",
    component: () => import("@/views/articles/Category/list.vue"),
  },
  {
    path: "/articles/categories/create",
    name: "articles-categories-create",
    component: () => import("@/views/articles/Category/create.vue"),
  },
  {
    path: "/articles/categories/:id/edit",
    name: "articles-categories-edit",
    component: () => import("@/views/articles/Category/edit.vue"),
  },

  {
    path: "/reports/users",
    name: "reports-users",
    component: () => import("@/views/reports/Users.vue"),
  },

  {
    path: "/comments/articles",
    name: "comments-articles",
    component: () => import("@/views/comments/Articles.vue"),
  },
  // {
  //   path: "/location/provinces/list",
  //   name: "location-province-list",
  //   component: () => import("@/views/location/Province/list.vue"),
  // },

  // {
  //   path: "/location/provinces/create",
  //   name: "location-province-create",
  //   component: () => import("@/views/location/Province/create.vue"),
  // },

  // {
  //   path: "/location/provinces/:id/edit",
  //   name: "location-province-edit",
  //   component: () => import("@/views/location/Province/edit.vue"),
  // },
  {
    path: "/location/cities/list",
    name: "location-cities-list",
    component: () => import("@/views/location/City/list.vue"),
  },

  {
    path: "/location/cities/create",
    name: "location-cities-create",
    component: () => import("@/views/location/City/create.vue"),
  },

  {
    path: "/location/cities/:id/edit",
    name: "location-cities-edit",
    component: () => import("@/views/location/City/edit.vue"),
  },

  { path: "/:pathMatch(.*)*", redirect: "/dashboard" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
