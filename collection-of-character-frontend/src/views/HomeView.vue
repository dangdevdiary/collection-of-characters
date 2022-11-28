<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="4"
        class="pa-3"
        v-for="character in filteredPosts"
        :key="character._id"
      >
        <v-card
          class="pa-1"
          no-gutters
          :to="{ name: 'character', params: { id: character._id } }"
        >
          <v-img
            cover
            class="pa-0"
            height="250"
            :src="`http://localhost:2608/${character.image}`"
          ></v-img>
          <v-btn
            :to="{ name: 'category', params: { category: character.category } }"
            class="ml-4 mt-3"
            small
            variant="outlined"
            color="indigo"
          >
            {{ character.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ character.name }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ character.content.substring(0, 120) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import API from "../api";
import store from "../store/store";

// Components

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      characters: [],
      searchText: "",
    };
  },

  computed: {
    searchTextStore() {
      return store.state.searchText;
    },

    postStrings() {
      return this.characters.map((character) => {
        const { name } = character;
        return name.toLowerCase();
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredPosts() {
      if (!this.searchTextStore) return this.characters;
      return this.characters.filter((character, index) =>
        this.postStrings[index].includes(this.searchTextStore)
      );
    },
  },
  async created() {
    this.characters = await API.getAllPost();
    try {
      const data = await API.authUser();
      const userInfo = {
        name: data.user.name,
        lengthCharacters: this.characters.length,
      };
      if (data.user) {
        store.dispatch("setLengthAndName", userInfo);
        store.dispatch("setAuthUser", true);
      }
      if (this.$route.query.message) {
        this.$toast.success(this.$route.query.message, {
          position: "top-right",
        });
      }
      if (window.history.state.message) {
        this.$toast.success(window.history.state.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      store.dispatch("setAuthUser", false);
    }
  },
});
</script>
