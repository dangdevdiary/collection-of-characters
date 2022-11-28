<template lang="">
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <v-img :src="`http://localhost:2608/${character.image}`"></v-img>
          <v-card-actions>
            <v-row>
              <v-col sm="4">
                <v-btn
                  class="ml-2"
                  variant="outlined"
                  color="primary"
                  @click="handleClick"
                >
                  {{ character.category }}
                </v-btn>
              </v-col>
              <v-col sm="8" class="d-flex justify-end">
                <v-btn color="success" variant="tonal" @click="handleEdit">
                  Edit
                </v-btn>
                <v-btn
                  color="red"
                  @click="handleDelete(character._id)"
                  variant="tonal"
                  >Delete</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline pb-1">
            <h2>{{ character.name }}</h2>
          </v-card-subtitle>
          <v-card-text class="text-justify py-2">
            <div class="content">{{ character.content }}</div>
            <div class="text-grey text-right">
              <i> Được tạo ra vào lúc: {{ character.createAt }} </i>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
import store from "../store/store";
export default {
  name: "PostView",
  data() {
    return {
      character: {},
    };
  },
  async created() {
    this.character = await API.getPostById(this.$route.params.id);
    this.character.createAt = new Date(this.character.createAt).toLocaleString(
      "vi-vn"
    );
  },
  computed: {
    isAuth() {
      return store.state.isAuthenticated;
    },
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: "category",
        params: { category: this.character.category },
      });
    },
    handleEdit() {
      if (this.isAuth) {
        this.$router.push(`/edit-character/${this.character._id}`);
      } else {
        this.$router.push("/login");
        this.$toast.error("You are not login!", {
          position: "top-right",
        });
      }
    },
    async handleDelete(id) {
      if (this.isAuth) {
        const res = await API.deletePost(id);
        this.$router.push({ name: "home", state: { message: res.message } });
      } else {
        this.$router.push("/login");
        this.$toast.error("You are not login!", {
          position: "top-right",
        });
      }
    },
  },
};
</script>
<style lang="css">
.content {
  font-family: "Roboto", "Times New Roman", Times, serif;
  text-align: justify;
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
