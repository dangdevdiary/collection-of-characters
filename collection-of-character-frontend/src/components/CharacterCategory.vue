<template lang="">
  <v-container>
    <v-row>
      <v-col
        sm="12"
        md="6"
        lg="4"
        class="pa-3"
        v-for="character in characters"
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
            {{ character.title }}
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
import API from "@/api";
export default {
  data() {
    return {
      characters: [],
    };
  },
  async created() {
    this.characters = await API.getPostByCategory(this.$route.params.category);
  },
};
</script>
<style lang=""></style>
