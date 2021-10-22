import router from "@/router";
import store from "@/store";
import { VueCookieNext } from "vue-cookie-next";

export default {
  install: (app: { [key: string]: any }, options: any) => {
    app.config.globalProperties.$debounce = () => {
      let timeout = null || 1;
      return (fnc: () => void) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fnc();
        }, 300);
      };
    };
    app.config.globalProperties.$signOut = () => {
      router.push("/");
      VueCookieNext.removeCookie("userInfo");
      store.commit("userStore/USER_INFO", {});
    };
  },
};
