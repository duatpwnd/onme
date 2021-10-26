import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apiUrl from "@/assets/js/apiUrl";
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";
import * as Sentry from "@sentry/vue";
import mitt from "mitt";
import { Integrations } from "@sentry/tracing";
import globalPlugin from "@/plugin/globalPlugin";
import VueClipboard from "vue3-clipboard";
const app = createApp(App);
const emitter = mitt();
app.use(store).use(router).use(VueCookieNext).use(globalPlugin).mount("#app");
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});

Sentry.init({
  environment: process.env.NODE_ENV,
  app,
  dsn: "https://7d24e9194bf34ccb9741a04d8d8db6bc@o1036024.ingest.sentry.io/6003484",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
app.config.globalProperties.axios = axios;
app.config.globalProperties.apiUrl = apiUrl;
app.config.globalProperties.emitter = emitter;
app.config.errorHandler = (err, vm, info) => {
  console.log("에러:", err, "정보:", info);
};
app.config.warnHandler = (msg, vm, trace) => {
  console.log("경고:", msg, "컴포넌트:", trace);
};
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(
  (config: any) => {
    if (VueCookieNext.getCookie("userInfo") != null) {
      console.log("토큰:", VueCookieNext.getCookie("userInfo"));
      config.headers.Authorization =
        "Token " + VueCookieNext.getCookie("userInfo").token;
      config.headers.common["Authorization"] =
        "Token " + VueCookieNext.getCookie("userInfo").token;
    }
    return config;
  },
  (error) => {
    return error;
  }
);
axios.interceptors.response.use(
  (response) => {
    console.log("요청후:", response);
    return response;
  },
  (err: any) => {
    console.log("요청후에러:", err.response);
    if (err.response.status == 403) {
      console.log("dd");
      app.config.globalProperties.$signOut();
    }
    return Promise.reject(err.response);
  }
);
