import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddCharacter from "../views/AddCharacter.vue";
import DetailCharacterView from "../components/DetailCharacter.vue";
import LoginView from "../views/LoginView.vue";
import EditCharacterView from "../views/EditCharacterView.vue";
import CharacterCategory from "../components/CharacterCategory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add-character",
      name: "add-character",
      component: AddCharacter,
    },
    {
      path: "/character/:id",
      name: "character",
      component: DetailCharacterView,
    },
    {
      path: "/edit-character/:id",
      name: "edit-character",
      component: EditCharacterView,
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/category-post/:category",
      name: "category",
      component: CharacterCategory,
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
