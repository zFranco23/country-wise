import { createStore } from 'vuex';
import countries from './modules/countries';
import country from './modules/single-country';

export default createStore({

    modules:{
        countries,
        country
    }
})