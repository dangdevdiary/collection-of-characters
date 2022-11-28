<template lang="">
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title class="text-center font-weight-bold">
            Please fill in character information
          </v-card-title>
          <v-form
            @submit.prevent="submitForm"
            ref="form"
            enctype="multipart/form-data"
          >
            <v-text-field
              label="Name"
              prepend-icon="mdi:mdi-note"
              :rules="rules"
              v-model="character.name"
            ></v-text-field>
            <v-text-field
              label="Category"
              prepend-icon="mdi:mdi-view-list"
              :rules="rules"
              v-model="character.category"
            ></v-text-field>
            <v-textarea
              label="Content"
              prepend-icon="mdi:mdi-note-plus"
              :rules="rules"
              v-model="character.content"
            ></v-textarea>
            <v-file-input
              label="Select Image"
              show-size
              ref="file"
              counter
              multiple
              :rules="rules"
              @change="selectFile"
            ></v-file-input>
            <v-container class="text-center">
              <v-btn type="submit" class="mt-3" color="primary">
                Add Character
              </v-btn>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
import store from "../store/store";
export default {
  data() {
    return {
      rules: [(value) => !!value || "This field is require"],
      character: {
        name: "",
        category: "",
        content: "",
        image: "",
      },
      image: "",
    };
  },
  computed: {
    isAuthenticated() {
      return store.state.isAuthenticated;
    },
  },
  methods: {
    selectFile() {
      this.image = this.$refs.file.files[0];
    },
    async submitForm() {
      if (this.isAuthenticated === true) {
        const formData = new FormData();
        formData.append("name", this.character.name.toUpperCase());
        formData.append("category", this.character.category.toUpperCase());
        formData.append("content", this.character.content);
        formData.append("image", this.image);
        if (this.$refs.form.validate()) {
          const res = await API.addPost(formData);
          store.commit("SET_CLICK_BTN");
          this.$toast.success(res.message, { position: "top-right" });
        }
      } else {
        this.$router.push("/login");
        this.$toast.error("you are not login", { position: "top-right" });
      }
    },
  },
};
</script>
<style lang=""></style>
