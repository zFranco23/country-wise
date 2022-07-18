<template>
    <div>
        <input class="input" v-model="searchLocal" placeholder="Search a country ...." />
    </div>
</template>

<script>
import { debounce } from '@/helpers'
export default {
    data() {
        return {
            searchLocal: this.search,
            searchDebounced: '',
        }
    },
    watch: {
        searchLocal: debounce(function (newVal) {
            this.searchDebounced = newVal
        }, 500),
        searchDebounced(a, b) {
            this.$emit('changeInput', a);
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    padding: 1rem;
    outline: none;
    background-color: var(--color-bg-elements);
    color: var(--color-text);
    border: 1px solid transparent;
    box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07), 0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275), 0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
    font-family: Nunito;
}

.input::placeholder {
    font-family: Nunito;
    color: var(--color-text);
}

@media (min-width : 768px){
    .input {
        width: unset;
    }
}
/* .input:focus {
    outline: none;
    width: 100%;
} */
</style>