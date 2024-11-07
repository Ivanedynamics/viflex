<script setup lang="ts">
import FilterCategories from "./FilterCategories.vue";
import FilterColors from "./FilterColors.vue";
import FilterMeasures from "./FilterMeasures.vue";
import FilterPresentation from "./FilterPresentation.vue";
import FilterSearchQuery from "./FilterSearchQuery.vue";
</script>

<template>
  <section class="p-2">
    <div
      class="list-none flex flex-col align-items-start justify-start card shadow-xl dark:bg-slate-800 bg-[#fff] p-4"
    >
      <FilterSearchQuery />
      <FilterCategories />
      <FilterColors />
      <FilterMeasures />
      <FilterPresentation />
    </div>
  </section>
</template>
