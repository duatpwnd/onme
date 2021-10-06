import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
const app = createApp(App);
app.use(store).use(router).mount("#app");
app.config.globalProperties.axios = axios;
app.config.errorHandler = (err, vm, info) => {
  console.log("에러:", err, "vm", vm, "info:", info);
};
app.config.warnHandler = (msg, vm, trace) => {
  console.log("경고:", msg, vm, trace);
};
