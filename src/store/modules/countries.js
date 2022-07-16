import { getFromApi } from "../../helpers";
export default {
  namespaced: true,
  state: {
    countries: [],
  },

  actions: {
    async searchByRegion(ctx,payload) {
      try {
        const resp = await getFromApi(payload)
        const r = await resp.json();
        ctx.commit("updateCountries", r);
      } catch (err) {
        console.log(err);
      }
    },
    async searchByName(ctx,payload) {
        try {
          const resp = await getFromApi(payload)
          const r = await resp.json();
          ctx.commit("updateCountries", r);
        } catch (err) {
            console.log(err);
        }
      },
  },
  mutations: {
    updateCountries(state, arrCountries) {
      state.countries = arrCountries;
    },
  },
};
