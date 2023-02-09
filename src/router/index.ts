import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/posts",
    name: "posts",
    // route level code-splitting
    // this generates a separate chunk (posts.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "posts" */ "../pages/PostsPage.vue"),
  },
  {
    path: "/posts-store",
    name: "post-store",
    component: () => import("../pages/PostsWithStorePage.vue"),
  },
  {
    path: "/posts-composition",
    name: "post-composition",
    component: () => import("../pages/PostsCompositionApiPage.vue"),
  },
  {
    path: "/posts/:id",
    name: "post",
    component: () => import("../pages/PostPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
