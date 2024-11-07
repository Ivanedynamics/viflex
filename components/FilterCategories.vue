<script setup lang="ts">
import { InputSelectCategories } from "@/composables/filter_product.js";
import type { ICategory } from "~/server/api/models";

const { data } = useFetch<{
  data: ICategory[];
}>("/api/categories/withSubCategories");

const handleChange = (categoryId: string, subCategoryId?: string) => {
  const findCategoryItem = data?.value?.data?.find((e) => e?.id === categoryId);

  if (subCategoryId) {
    const existSubCategory = InputSelectCategories?.value?.some(
      (e) => subCategoryId === e
    );
    if (existSubCategory) {
      InputSelectCategories.value = InputSelectCategories.value?.filter(
        (e) => e !== subCategoryId
      );
      return;
    }
    InputSelectCategories.value = [
      ...InputSelectCategories.value,
      subCategoryId,
    ];
    return;
  }

  const existCategory = InputSelectCategories?.value?.find(
    (e) => categoryId === e
  );
  if (existCategory) {
    InputSelectCategories.value = [];
    return;
  }
  InputSelectCategories.value = [findCategoryItem?.id ?? ""];
  return;
};
</script>

<template>
  <div>
    <div class="label">
      <span class="label-text"
        >Categorias ({{ InputSelectCategories?.length }})</span
      >
    </div>
    <ul
      class="list-none flex max-h-[20rem] flex-col gap-3 p-0 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="category in data?.data"
        :key="category?.id"
        class="flex flex-col items-start justify-start"
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
          <span class="label-text uppercase text-sm font-bold">
            {{ category?.nombre }}
          </span>
        </label>
        <ul class="pl-4" v-if="InputSelectCategories?.includes(category.id)">
          <li v-for="subCategory in category?.subCategories">
            <label
              class="label w-full cursor-pointer gap-2 flex flex-row items-start justify-start"
            >
              <input
                type="checkbox"
                class="checkbox checkbox-success"
                :id="`category-${subCategory?.id}`"
                @change="() => handleChange(category.id, subCategory.id)"
                :checked="InputSelectCategories?.includes(subCategory.id)"
              />
              <span class="label-text text-xs uppercase">
                {{ subCategory?.nombre }}
              </span>
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
