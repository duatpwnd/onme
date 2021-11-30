import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";
import { createApp } from "vue";
import globalPlugin from "@/plugin/globalPlugin";
import App from "@/App.vue";
const app = createApp(App);
app.use(globalPlugin);
const axiosSet = () => {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  axios.interceptors.request.use(
    (config) => {
      console.log("요청전:", config);
      if (VueCookieNext.getCookie("userInfo") != null) {
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
      return response;
    },
    (err) => {
      console.log("요청후에러:", err.response);
      if (err.response.status == 403) {
        app.config.globalProperties.$signOut();
      }
      return Promise.reject(err.response);
    }
  );
};
export default axiosSet;
