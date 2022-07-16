import { createWebHashHistory, createRouter } from "vue-router";

import HomeVue from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeVue,
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory()
});
