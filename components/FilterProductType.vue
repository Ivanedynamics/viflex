<script setup lang="ts">
const { data } = useFetch("/api/categories");
import { selectedCategories } from "@/composables/filter_product.js";

const handleChange = (id: string) => {
  if (selectedCategories?.value?.find((e) => id === e)) {
    const snew = selectedCategories.value?.filter((e) => id !== e);
    selectedCategories.value = snew;
    return;
  }
  const newv = [...selectedCategories.value, id];
  selectedCategories.value = newv;
};
</script>

<template>
  <div class="border rounded-md bg-white">
    <header class="sticky top-0 bg-white p-4">
      <p class="font-bold text-lg">Tipo de producto</p>
    </header>
    <div class="bg-slate-600 w-auto h-[0.5px] opacity-15 mx-2"></div>
    <ul
      class="py-4 list-none flex flex-col max-h-[320px] gap-6 p-4 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="category in data?.categories"
        :key="category?.id"
        class="flex flex-row gap-2"
      >
        <input
          type="checkbox"
          name=""
          :id="`category-${category?.id}`"
          @change="() => handleChange(category.id)"
          :checked="selectedCategories?.includes(category.id)"
        />
        <label :for="`category-${category?.id}`" class="flex w-full">
          <p>{{ category?.nombre }}</p>
        </label>
      </li>
    </ul>
  </div>
</template>
