import { createWebHashHistory, createRouter } from "vue-router";

import HomeVue from "../views/Home.vue";
import SingleCountryVue from "../views/SingleCountry.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeVue,
  },
  {
    path: "/country/:countryCode",
    name: "country",
    component: SingleCountryVue,
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory()
});
