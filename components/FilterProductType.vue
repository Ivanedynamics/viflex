<script setup lang="ts">
const { data } = useFetch<{ categories: ICategory[] }>("/api/categories");
import { selectedCategories } from "@/composables/filter_product.js";
import type { ICategory } from "~/types/back";

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
  <div class="">
    <header class="top-0 p-2">
      <p class="card-title text-xs">Tipo de producto</p>
    </header>
    <div class="bg-slate-600 w-auto h-[0.5px] opacity-15 mx-2"></div>
    <ul
      class="py-4 list-none flex flex-col max-h-[200px] gap-6 p-2 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="category in data?.categories"
        :key="category?.id"
        class="flex flex-row gap-2 items-start justify-start"
      >
        <label
          class="label cursor-pointer gap-2 flex flex-row items-start justify-start"
        >
          <input
            type="checkbox"
            class="checkbox"
            :id="`category-${category?.id}`"
            @change="() => handleChange(category.id)"
            :checked="selectedCategories?.includes(category.id)"
          />
          <span class="label-text uppercase">{{ category?.nombre }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
