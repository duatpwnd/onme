import { Module, ActionContext } from "vuex";
import { MutationTypes } from "./mutation-types";
interface RootState {
  userInfo: { [key: string]: any };
}
const userStore: Module<RootState, { [key: string]: any }> = {
  namespaced: true,
  state: () => ({
    userInfo: {},
  }),
  mutations: {
    [MutationTypes.USER_INFO]: (state, payload) => {
      state.userInfo = payload;
    },
  },
  getters: {},
  actions: {},
};
export default userStore;
