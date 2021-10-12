import { createStore, createLogger } from "vuex";
import userStore from "@/store/modules/userStore";
export default createStore({
  modules: { userStore },
  plugins:
    process.env.NODE_ENV === "development" ? [createLogger()] : undefined,
});
