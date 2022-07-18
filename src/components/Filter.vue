<template>
  <div class="filter__region">
    <div class="filter" @click="handleToggle">
      {{ hasSelectedOneRegion ? hasSelectedOneRegion.name : 'Filter by region' }}
    </div>
    <div class="filter_options" v-if="open">
      <div :class="['filter_option', hasSelectedOneRegion && hasSelectedOneRegion.name === c.name ? 'bold' : '']"
        v-for="(c, idx) in continentsArr" :key="`c-${idx}`" @click="handleSelect(c)">
        {{ c.name }}
      </div>
    </div>
  </div>
</template>

<script>
const continentsArr = [
  { name: 'Africa', s: 'africa' },
  { name: 'America', s: 'america' },
  { name: 'Asia', s: 'asia' },
  { name: 'Europe', s: 'europe' },
  { name: 'Oceania', s: 'oceania' },
]

export default {
  created() {
    this.continentsArr = continentsArr;
  },
  data() {
    return {
      open: false
    }
  },
  props: {
    selectedRegion: String,
  },
  methods: {
    handleSelect(opt) {
      this.$emit('updateRegion', opt);
      this.open = false;
    },
    handleToggle() {
      this.open = !this.open;
    }
  },
  computed: {
    hasSelectedOneRegion() {
      return continentsArr.find(el => el.s === this.selectedRegion);
    }
  }
}
</script>

<style scoped>
.filter__region {
  position: relative;
  height: fit-content;
  cursor: pointer;
  font-weight: 500;
  width: 12rem;
}
.bold {
  font-weight: 800;
}
.filter {
  padding: 8px;
  background-color: var(--color-bg-elements);
  color: var(--color-text);
  border: 1px solid transparent;
  box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07), 0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275), 0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
}

.filter_options {
  z-index: 9999;
  margin-top: 8px;
  width: 100%;
  height: fit-content;
  position: absolute;
  bottom: 0;
  top: 100%;
  background-color: var(--color-bg-elements);
  color: var(--color-text);
  border: 1px solid transparent;
  box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07), 0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275), 0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}

.filter_option:hover {
  font-weight: 600;
}
</style>