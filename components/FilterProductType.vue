<script setup lang="ts">
const { data } = useFetch<{ categories: ICategory[] }>("/api/categories");
import { InputSelectCategories } from "@/composables/filter_product.js";
import type { ICategory } from "~/types/back";

const handleChange = (id: string) => {
  if (InputSelectCategories?.value?.find((e) => id === e)) {
    const snew = InputSelectCategories.value?.filter((e) => id !== e);
    InputSelectCategories.value = snew;
    return;
  }
  const newv = [...InputSelectCategories.value, id];
  InputSelectCategories.value = newv;
};
</script>

<template>
  <div>
    <div class="label">
      <span class="label-text">Tipos de producto</span>
    </div>
    <ul
      class="list-none flex flex-col max-h-[200px] gap-6 p-2 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="category in data?.categories"
        :key="category?.id"
        class="flex flex-row gap-2 items-start justify-start"
      >
        <label
          class="label w-full cursor-pointer gap-2 flex flex-row items-start justify-start"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            :id="`category-${category?.id}`"
            @change="() => handleChange(category.id)"
            :checked="InputSelectCategories?.includes(category.id)"
          />
          <span class="label-text uppercase">{{ category?.nombre }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
