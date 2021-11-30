import { MutationTypes } from "./mutation-types";
const userStore = {
  namespaced: true,
  state: () => ({
    userInfo: {},
  }),
  mutations: {
    [MutationTypes.USER_INFO]: (state, payload) => {
      console.log(state, payload);
      state.userInfo = payload;
    },
  },
  getters: {},
  actions: {},
};
export default userStore;
