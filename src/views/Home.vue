<template>
    <div class="home__container">
        <div class="home__actions">
            <Searcher @changeInput="handleInputChange" />
            <Filter @updateRegion="handleRegionChange" :selectedRegion="region" />
        </div>
        <div v-if="isFetchingCountries" class="container_spinner">
            <LoaderSpinner />
        </div>
        <div v-else-if="countries && countries.length" class="home__countries">
            <div class="countries__list">
                <div v-for="(c) in countries.slice(0, 8)" :key="c.name.common" class="country__container-card">
                    <CardCountry :country="c" />
                </div>
            </div>
        </div>
        <div v-else>
            <h1 class="countries__disclaimer">No results.</h1>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Searcher from "../components/Searcher.vue";
import Filter from "../components/Filter.vue";
import CardCountry from "../components/CardCountry.vue";

import LoaderSpinner from "../components/LoaderSpinner.vue";

export default {
    components: {
    Searcher,
    Filter,
    CardCountry,
    LoaderSpinner
},
    data() {
        return {
            searchInput: '',
        }
    },
    methods: {
        handleInputChange(val) {
            this.searchInput = val;
        },
        handleRegionChange(val) {
            this.region = val.s;
            this.$store.commit('countries/updateRegion',val.s);
        }
    },
    watch: {
        searchInput(curr, prev) {
            let path = '';
            if (curr.length === 0) {
                path= '/all'
            }else{
                path = `/name/${curr}`
            }
            this.$store.dispatch('countries/fetchCountries', path);
        },
        region(curr) {
            let path = '';
            if (curr.length === 0) return;
            path = `/region/${curr}`
            this.$store.dispatch('countries/fetchCountries', path);
        }
    },
    computed: mapState({
        countries: ({ countries }) => countries.countries,
        isFetchingCountries: ({ countries }) => countries.isFetchingCountries,
        region : ({ countries }) => countries.region,
    })
}
</script>

<style>
.home__container {
    padding: 1rem 0;
}

.home__actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;
}

.home__countries {
    padding: 8px;
    margin-top: 2rem;
}

.country__container-card {
    height: 100%;
    min-height: 420px;
    width: calc(100% - 16px);
}

.countries__disclaimer {
    color: var(--color-text);
}

.countries__list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    flex-direction: row;
    width: 100%;
}

.container_spinner {
    width: 100%;
    display: flex;
    justify-content: center;

}

@media (min-width : 600px){
    .country__container-card {
        width: calc(50% - 16px);
    }
}

@media (min-width : 768px) {
    .home__actions {
        align-items: center;
        flex-direction: row;
    }
    .country__container-card {
        width: calc(33.3% - 16px);
    }
}

@media (min-width : 992px) {
    .country__container-card {
        width: calc(25% - 16px);
    }
}
</style>