import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apiUrl from "@/assets/js/apiUrl";
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";
import { Vue3Mq, MqResponsive } from "vue3-mq";
import mitt from "mitt";
import globalPlugin from "@/plugin/globalPlugin";
import VueClipboard from "vue3-clipboard";
import axiosSet from "@/utils/axios";
import sentry from "@/utils/sentry";
const app = createApp(App);
const emitter = mitt();
app.config.globalProperties.axios = axios;
app.config.globalProperties.apiUrl = apiUrl;
app.config.globalProperties.emitter = emitter;
app.component("mq-responsive", MqResponsive);
app
  .use(store)
  .use(globalPlugin)
  .use(Vue3Mq)
  .use(router)
  .use(VueCookieNext)
  .mount("#app");
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});
app.config.errorHandler = (err, vm, info) => {
  console.log("에러:", err, "정보:", info);
};
app.config.warnHandler = (msg, vm, trace) => {
  console.log("경고:", msg, "컴포넌트:", trace);
};
axiosSet();
sentry();
