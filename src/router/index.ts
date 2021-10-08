import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "WorkFeed",
    component: () =>
      import(/* webpackChunkName: "WorkFeed" */ "../views/WorkFeed.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "Search" */ "../views/Search.vue"),
  },
  {
    path: "/detail",
    name: "CopyRightWorksDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CopyRightWorks" */ "../views/CopyRightWorksDetail.vue"
      ),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "Register" */ "../views/CopyRightRegister.vue"
      ),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () =>
      import(/* webpackChunkName: "Signin" */ "../views/Signin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
