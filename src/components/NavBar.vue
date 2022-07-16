<template>
    <navbar class="navbar">
        <h1>Where in the world?</h1>
        <button>Dark Mode</button>
    </navbar>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    background-color: var(--color-bg-elements);
    color: var(--color-text);
    border-bottom: 1px solid gray;
}

h1 {
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
</style>