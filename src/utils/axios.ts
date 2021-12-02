import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";
import { createApp } from "vue";
import globalPlugin from "@/plugin/globalPlugin";
import App from "@/App.vue";
const app = createApp(App);
app.use(globalPlugin);
import searchHistory from "@/components/search-category/searchHistory";
const { getHistory, allList } = searchHistory();

const axiosSet = () => {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  axios.interceptors.request.use(
    (config: { [key: string]: any }) => {
      if (VueCookieNext.getCookie("userInfo") != null) {
        console.log("유저정보있다");
        config.headers.Authorization =
          "Token " + VueCookieNext.getCookie("userInfo").token;
        config.headers.common["Authorization"] =
          "Token " + VueCookieNext.getCookie("userInfo").token;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err.response);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err: any) => {
      console.log("요청후에러:", err.response);
      if (err.response.status == 403) {
        app.config.globalProperties.$signOut();
      }
      return Promise.reject(err.response);
    }
  );
};
export default axiosSet;
