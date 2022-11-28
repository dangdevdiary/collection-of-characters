import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import vuetify from "./plugins/vuetify";
import "./assets/main.css";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const app = createApp(App);
app.use(router).use(ToastPlugin).use(vuetify);

app.mount("#app");
