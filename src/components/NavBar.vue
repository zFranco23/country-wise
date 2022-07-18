<template>
    <navbar class="navbar">
        <router-link to="/">
            <h1>Where in the world?</h1>
        </router-link>
        <div class="switch__wrap">
            <SwitchTheme :handleUserTheme="handleUserTheme"/>
            {{ userTheme === 'dark' ? 'Dark mode' : 'Light mode' }}
        </div>
    </navbar>
</template>

<script>
import SwitchTheme from './SwitchTheme.vue';
export default {
    data() {
        return {
            userTheme: ""
        };
    },
    methods: {
        setTheme(theme) {
            localStorage.setItem("user-theme", theme);
            this.userTheme = theme;
        },
        handleUserTheme() {
            const activeTheme = localStorage.getItem("user-theme");
            if (activeTheme === "light") {
                this.setTheme("dark");
            }
            else {
                this.setTheme("light");
            }
        },
        getMediaPreference() {
            const hasDarkPreference = window && window.watchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (hasDarkPreference) {
                return "dark";
            }
            else {
                return "light";
            }
        },
        getTheme() {
            return localStorage.getItem("user-theme");
        },
    },
    mounted() {
        const initUserTheme = this.getTheme() || this.getMediaPreference();
        this.setTheme(initUserTheme);
    },
    watch: {
        userTheme(theme) {
            document.documentElement.setAttribute("data-theme", theme);
        }
    },
    components: { SwitchTheme }
}
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    color: var(--color-text);
    background-color: var(--color-bg-elements);
    border-bottom: 1px solid gray;
    transition: color 0.5s, background-color 0.5s;
}

h1 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
}

button {
    cursor: pointer;
    font-family: Nunito;
    font-weight: 600;
    background-color: transparent;
    border: none;
    background-color: var(--color-bg-elements);
    color: var(--color-text);
}

.switch__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (min-width : 600px){
    .navbar {
        flex-direction: row;
    }
}
</style>