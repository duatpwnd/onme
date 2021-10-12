import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apiUrl from "@/assets/js/apiUrl";
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";
const app = createApp(App);
app.use(store).use(router).use(VueCookieNext).mount("#app");
app.config.globalProperties.axios = axios;
app.config.globalProperties.apiUrl = apiUrl;
app.config.errorHandler = (err, vm, info) => {
  console.log("에러:", err, "vm", vm, "info:", info);
};
app.config.warnHandler = (msg, vm, trace) => {
  console.log("경고:", msg, vm, trace);
};
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(
  (config) => {
    console.log("axios 요청전:", config);
    return config;
  },
  (err) => {
    console.log(err);
  }
);
axios.interceptors.response.use((response) => {
  console.log("axios 요청후:", response);
  return response;
});
