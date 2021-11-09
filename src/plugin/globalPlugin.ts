import router from "@/router";
import store from "@/store";
import { VueCookieNext } from "vue-cookie-next";
export default {
  install: (app: { [key: string]: any }, options: any) => {
    // 여러번 호출되는 함수를 종합적으로 한번만호출해주는 함수
    app.config.globalProperties.$debounce = () => {
      let timeout = null || 1;
      return (fnc: () => void) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fnc();
        }, 500);
      };
    };
    // 로그아웃 함수
    app.config.globalProperties.$signOut = () => {
      router.push("/signIn");
      VueCookieNext.removeCookie("userInfo");
      store.commit("userStore/USER_INFO", {});
    };
    // 파일객체를 base64로 바꿔주는 함수
    app.config.globalProperties.$getBase64 = (obj: Blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(obj);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      });
    };
    // url을 base64로 바꿔주는 함수
    app.config.globalProperties.$toDataURL = (
      url: string,
      callback: (param: string) => void
    ) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result as string);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    };
    // 스크롤 바닥 감지 함수
    app.config.globalProperties.$scrollDetect = (
      element: HTMLElement,
      callback: () => void
    ) => {
      if (element != null) {
        element.addEventListener("scroll", () => {
          if (
            element.clientHeight + Math.ceil(element.scrollTop) >=
            element.scrollHeight
          ) {
            callback();
          }
        });
      }
    };
  },
};
