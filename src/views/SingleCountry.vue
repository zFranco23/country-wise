<template>
    <div class="country__container">
        <div v-if="isFetchingCountry" class="container__loading">
            <LoaderSpinner />
        </div>
        <div v-else-if="!country">
            <h1 class="country__name">This country not exists</h1>
        </div>
        <div v-else>
            <div class="button__back">
                <router-link class="btn" :to="{ name: 'home' }">Go back</router-link>
            </div>
            <div class="country__content">
                <div class="country__left-content">
                    <img :src="country.flags && country.flags.png ? country.flags.png : ''" class="country__flag" />
                </div>
                <div class="country__right-content">
                    <h1 class="country__name">{{ country.name.common }}</h1>

                    <div class="country__details">
                        <div class="country__details-wrap">
                            <p v-if="country.name" class="country__details">Native Name: <span>{{ country.name.official
                            }}</span></p>
                            <p v-if="country.population" class="country__details">Population: <span>{{
                                    country.population.toLocaleString()
                            }}</span></p>
                            <p v-if="country.region" class="country__details">Region: <span>{{ country.region }}</span>
                            </p>
                            <p v-if="country.subregion" class="country__details">Sub Region: <span>{{ country.subregion
                            }}</span></p>
                            <p v-if="country.capital" class="country__details">Capital: <span>{{ country.capital.length
                                    ?
                                    country.capital[0] : ''
                            }}</span></p>
                        </div>

                        <div class="country__details-wrap">
                            <p v-if="country.continents" class="country__details">Continent: <span>{{
                                    country.continents[0]
                            }}</span></p>
                            <p v-if="country.tld" class="country__details">Top Level Domain: <span>{{ country.tld[0]
                            }}</span></p>
                            <p v-if="currencies" class="country__details">Currencies: <span>{{ currencies }}</span></p>
                            <p v-if="languages" class="country__details">Languages: <span>{{ languages }}</span></p>
                        </div>

                    </div>
                    <div v-if="country.borders" class="borders__wrap">
                        <p class="country__details">Border countries: </p>
                        <LoaderSpinner v-if="isFetchingBorders" />
                        <div v-else-if="borderCountries" class="borders__list">
                            <router-link :to="{ name: 'country', params: { countryCode: c.cca3 } }"
                                v-for="(c, i) in borderCountries" :key="`border-${i}`" class="border__item">
                                <p>{{ c.name.common }}</p>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import LoaderSpinner from '../components/LoaderSpinner.vue';
import { getFromApi } from '../helpers';
export default {
    data() {
        return { isFetchingBorders: false, borderCountries: null }
    },
    components: { LoaderSpinner },
    computed: {
        currencies() {
            const c = this.country;
            if (c && c.currencies) {
                const keys = Object.keys(c.currencies);
                return keys.map(k => c.currencies[k].name).join(', ');
            }
        },
        languages() {
            const c = this.country;
            if (c && c.languages) {
                const keys = Object.keys(c.languages);
                return keys.map(k => c.languages[k]).join(', ');
            }
        },
        ...mapState({
            country: state => state.country.country,
            isFetchingCountry: state => state.country.isFetchingCountry
        })
    },
    created() {
        const id = this.$route.params.countryCode;
        if (id) {
            const path = `/alpha/${id}`;
            this.$store.dispatch("country/searchCountryByCode", path);
        }
    },
    methods: {
        async getCountryByCode(code) {
            const path = `/alpha/${code}`;
            const r = await getFromApi(path);
            const rp = await r.json();
            return rp;
        },
        async getBorders() {
            const brd = this.country.borders;
            const arrFetch = brd.map(el => {
                return this.getCountryByCode(el);
            })
            const [...rest] = await Promise.all(arrFetch);

            this.isFetchingBorders = false;
            this.borderCountries = rest.filter(c => c && c[0]).map(c => c[0]);
        }
    },
    watch: {
        country() {
            if (this.country.borders) {
                this.isFetchingBorders = true;
                this.getBorders();
            }
        }
    },
    beforeRouteUpdate(to, from, next) {
        const id = to.params.countryCode;
        if (id) {
            const path = `/alpha/${id}`;
            this.$store.dispatch("country/searchCountryByCode", path);
        }
        next()
    }
}
</script>

<style scoped>
.container__loading {
    display: flex;
    justify-content: center;
    width: 100%;
}

.country__container {
    padding: 1rem 0;
}

.country__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}


.country__left-content {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
}


.country__flag {
    width: 100%;
    max-width: 100%;
}

.country__right-content {
    width: 100%;
}

.country__name {
    font-weight: 600;
    color: var(--color-text);
}

.button__back {
    margin: 3rem 0;
}

.borders__wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.borders__list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.border__item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    border: 1px solid gray;
    padding-left:0.8rem;
    padding-right: 0.8rem;
    color: var(--color-text);
}

.btn {
    cursor: pointer;
    background: none;
    border: none;
    color: var(--color-text);
    background-color: var(--color-bg-elements);
    font-family: Nunito;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07), 0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275), 0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
}

.country__details-wrap {
    margin: 1.5rem 0;
}

.country__details {
    width: 100%;
    font-weight: 600;
    color: var(--color-text);
}

.country__details span {
    font-weight: 300;
    color: var(--color-text);
}

@media (min-width : 768px) {
    .country__content {
        flex-direction: row;
    }

    .country__flag {
        width: 80%;
        max-width: 100%;
    }

    .country__details {
        display: flex;
        gap: 16px;
        width: 100%;
    }

    .country__details-wrap {
        width: 50%;
    }

    .country__left-content {
        width: calc(50% - 16px);
    }

    .country__right-content {
        width: calc(50% - 16px);
    }
}
</style>