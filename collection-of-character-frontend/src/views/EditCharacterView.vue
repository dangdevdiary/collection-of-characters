<template lang="">
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title class="text-center font-weight-bold"
            >UPDATE CHARACTER</v-card-title
          >
          <v-divider></v-divider>
          <v-form
            @submit.prevent="updateForm"
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
            <v-img
              :src="`http://localhost:2608/${character.image}`"
              width="120"
              class="ml-10"
            ></v-img>
            <v-card class="text-center" flat>
              <v-btn type="submit" class="mt-3" color="primary"
                >Update Character
              </v-btn>
            </v-card>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
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
  async created() {
    const res = await API.getPostById(this.$route.params.id);
    this.character = res;
  },

  methods: {
    selectFile() {
      this.image = this.$refs.file.files[0];
    },
    async updateForm() {
      const formData = new FormData();
      formData.append("name", this.character.name.toUpperCase());
      formData.append("category", this.character.category.toUpperCase());
      formData.append("content", this.character.content);
      formData.append("image", this.image);
      formData.append("old_img", this.character.image);
      if (this.$refs.form.validate()) {
        const res = await API.updatePost(this.$route.params.id, formData);
        this.$router.push({
          name: "home",
          query: { message: res.message },
        });
      }
    },
  },
};
</script>
<style lang=""></style>
