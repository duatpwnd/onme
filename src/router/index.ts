import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/feed",
    name: "WorkFeed",
    component: () =>
      import(/* webpackChunkName: "WorkFeed" */ "../views/WorkFeed.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
