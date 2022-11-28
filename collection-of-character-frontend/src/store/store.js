import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state: {
    isAuthenticated: false,
    email: "",
    name: "",
    searchText: "",
    clickBtnHome: false,
    lengthCharacters: "",
  },
  actions: {
    setAuthUser({ commit }, auth) {
      commit("SET_AUTH", auth);
    },
    setLengthAndName({ commit }, user) {
      commit("SET_LENGTH_NAME", user);
    },
  },
  mutations: {
    SET_AUTH(state, auth) {
      state.isAuthenticated = auth;
    },
    SET_LENGTH_NAME(state, user) {
      state.lengthCharacters = user.lengthCharacters;
      state.name = user.name;
    },

    SET_SEARCH_TEXT(state, text) {
      state.searchText = text;
    },
    SET_CLICK_BTN(state) {
      state.clickBtnHome = !state.clickBtnHome;
    },
  },
});
export default store;
