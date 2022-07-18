<template>
  <router-link :to="{ name: 'country', params: { countryCode: country.cca3 } }" class="card">
    <div class="card__country">
      <img :src="country.flags.svg" class="flag__country" />
      <div class="card__content">
        <h5 class="card__title">{{ country.name.official }}</h5>
        <h4 class="card__info">Region: <span>{{ country.region }}</span></h4>
        <h4 class="card__info">Capital : <span>{{ country.capital.length ? country.capital[0] : '' }}</span></h4>
        <h4 class="card__info">Population : <span>{{ country.population.toLocaleString() }}</span></h4>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    country: Object,
  }
}
</script>

<style scoped>
.card {
  display: block;
  height: 100%;
  min-height: 420px;
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
  text-decoration: none;
  border: 1px solid transparent;
  box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07), 0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275), 0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
}

.card__country {
  height: 420px;
  max-width: 100%;
  overflow-x: hidden;
  border-radius: 10px;
  width: 100%;
  background-color: var(--color-bg-elements);
}

.flag__country {
  object-fit: cover;
  width: 100%;
  height: 200px;
  max-width: 100%;
}

.card__content {
  padding: 24px;
}

.card__title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-text);
}

.card__info {
  font-weight: 600;
  color: var(--color-text);
}

.card__info span {
  font-weight: 300;
  color: var(--color-text);
}
</style>