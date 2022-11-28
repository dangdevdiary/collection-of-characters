<template lang="">
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <v-list>
        <v-list-item
          prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU"
        >
          <v-list-item-title>
            {{ userName }}
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="lengthCharacters"
            class="lenght-characters"
          >
            {{ `Total: ${lengthCharacters} characters` }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list class="mt-3" density="compact">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          ref="items"
          :value="item"
          active-color="primary"
          :to="item.link"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="teal">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>V-Lib</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
        <v-text-field
          density="compact"
          hide-details
          variant="solo"
          placeholder="Tìm kiếm"
          v-model="searchText"
        ></v-text-field>
      </v-responsive>
      <v-btn variant="text" icon="mdi:mdi-magnify"></v-btn>
      <v-btn v-if="!isAuthenticated" to="/login">Sign in</v-btn>
      <v-btn v-else @click="handleLogout">Sign out</v-btn>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>
<script>
import API from "../api";
import store from "../store/store";
export default {
  name: "NavView",
  data: () => ({
    drawer: null,
    items: [
      { text: "Home", icon: "mdi:mdi-home", link: "/" },
      {
        text: "Add Character",
        icon: "mdi:mdi-note-plus",
        link: "/add-character",
      },
      { text: "About", icon: "mdi:mdi-help-box", link: "/about" },
    ],
    searchText: "",
  }),
  watch: {
    searchText() {
      store.commit("SET_SEARCH_TEXT", this.searchText.toLowerCase());
    },
    clickBtnHome() {
      this.$refs.items[0].$el.click();
    },
  },
  methods: {
    async handleLogout() {
      await API.logout();
      store.dispatch("setAuthUser", false);
      store.dispatch("setLengthAndName", {});
      store.commit("SET_CLICK_BTN");
    },
  },
  computed: {
    isAuthenticated() {
      return store.state.isAuthenticated;
    },
    userName() {
      return store.state.name;
    },
    clickBtnHome() {
      return store.state.clickBtnHome;
    },
    lengthCharacters() {
      return store.state.lengthCharacters;
    },
  },
};
</script>
<style lang="css">
.lenght-characters {
  line-height: 18px;
}
</style>
