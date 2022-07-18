import { fillObjectValues, getFromApi } from "../../helpers";

export default {
  namespaced: true,
  state: {},
  actions: {
    async searchCountryByCode(ctx,payload) {
      try {
        ctx.commit('initFetchCountry')
        const resp = await getFromApi(payload)
        const country = await resp.json();
        
        if(!!country.status){
          ctx.commit('fetchCountryError')
        }else{
          ctx.commit("fetchCountrySuccess", country[0]);
        }
      } catch (err) {
        console.log('a');
      }
    },
  },
  mutations: {
    initFetchCountry(state){
      const fill = {
        isFetchingCountry: true,
      }
      fillObjectValues(state,fill)
    },
    fetchCountrySuccess(state, country) {
      const fill = {
        ...state,
        country,
        fetchCountrySuccess :true,
        isFetchingCountry: false,
      };
      fillObjectValues(state,fill)
    },
    fetchCountryError(state){
      const fill = {
        ...state,
        country: undefined,
        fetchCountrySuccess :undefined,
        fetchCountryError :true,
        isFetchingCountry: false,
      };

      fillObjectValues(state,fill)
    }
  },
};
