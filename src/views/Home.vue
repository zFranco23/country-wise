<template>
    <div class="home__container">
        <div class="home__actions">
            <Searcher @changeInput="handleInputChange"/>
            <Filter @updateRegion="handleRegionChange"/>
        </div>
    </div>
</template>

<script>
import Searcher from "../components/Searcher.vue";
import Filter from "../components/Filter.vue";


export default {
    components: {
        Searcher,
        Filter,
    },
    data(){
        return {
            searchInput : '',
            region: ''
        }
    },
    methods: {
        handleInputChange(val){
            this.searchInput = val;
        },
        handleRegionChange(val){
            this.region = val.s;
        }
    },
    watch: {
        searchInput(curr,prev){
            let path = '';
            if(curr.length === 0) return;
            path = `/name/${curr}`
            this.$store.dispatch('countries/searchByName',path);
        },
        region(curr){
            let path = '';
            if(curr.length === 0) return;
            path = `/region/${curr}`
            this.$store.dispatch('countries/searchByRegion',path);
        }

    }
}
</script>

<style>

.home__container {
    padding: 1rem 0;
}
.home__actions {
    display: flex;
    justify-content: space-between;
}
</style>