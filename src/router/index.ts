import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "WorkFeed",
    component: () =>
      import(/* webpackChunkName: "WorkFeed" */ "../views/WorkFeed.vue"),
  },
  {
    path: "/myInfo",
    name: "MyInfo",
    component: () =>
      import(/* webpackChunkName: "MyInfo" */ "../views/MyInfo.vue"),
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
    path: "/signIn",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "SignIn" */ "../views/SignIn.vue"),
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "SignUp" */ "../views/SignUp.vue"),
    children: [
      {
        path: "step1",
        component: () => import("@/views/signup/Step1.vue"),
        name: "Step1",
      },
      {
        path: "step2",
        component: () => import("@/views/signup/Step2.vue"),
        name: "Step2",
      },
      {
        path: "step3",
        component: () => import("@/views/signup/Step3.vue"),
        name: "Step3",
      },
    ],
  },
  {
    path: "/myPage",
    name: "MyPage",
    component: () =>
      import(/* webpackChunkName: "Mypage" */ "../views/MyPage.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () =>
      import(/* webpackChunkName: "Setting" */ "../views/Setting.vue"),
  },
  {
    path: "/accountManage",
    name: "AccountManage",
    component: () =>
      import(
        /* webpackChunkName: "AccountManage" */ "../views/AccountManage.vue"
      ),
  },
  {
    path: "/withdrawal",
    name: "Withdrawal",
    component: () =>
      import(/* webpackChunkName: "Withdrawal" */ "../views/Withdrawal.vue"),
  },
  {
    path: "/userDetail",
    name: "UserDetail",
    component: () =>
      import(/* webpackChunkName: "UserDetail" */ "../views/UserDetail.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
