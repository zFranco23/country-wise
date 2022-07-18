import { fillObjectValues, getFromApi } from "../../helpers";
export default {
  namespaced: true,
  state: {
    countries: [],
    region : '',
  },
  actions: {
    async fetchCountries(ctx, payload) {
      try {
        ctx.commit("initFetchCountries");
        const resp = await getFromApi(payload);
        const countries = await resp.json();

        if (!!countries.status) {
          ctx.commit("fetchCountriesError");
        } else {
          ctx.commit("fetchCountriesSuccess", countries);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    updateRegion(state,payload){
      state.region =  payload;
    },
    initFetchCountries(state) {
      const fill = {
        isFetchingCountries: true,
      };
      fillObjectValues(state, fill);
    },
    fetchCountriesSuccess(state, countries) {
      const fill = {
        ...state,
        countries,
        fetchCountriesSuccess: true,
        isFetchingCountries: false,
      };
      fillObjectValues(state, fill);
    },
    fetchCountriesError(state) {
      const fill = {
        ...state,
        countries: undefined,
        fetchCountriesSuccess: undefined,
        fetchCountriesError: true,
        isFetchingCountries: false,
      };

      fillObjectValues(state, fill);
    },
  },
};
