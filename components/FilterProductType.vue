<script setup lang="ts">
import { InputSelectCategories } from "@/composables/filter_product.js";
import type { ICategory } from "~/server/api/models";

const { data } = useFetch<{
  data: ICategory[];
}>("/api/categories/withSubCategories");

const handleChange = (id: string) => {
  if (InputSelectCategories?.value?.find((e) => id === e)) {
    const item = data?.value?.data?.find((e) => e?.id === id);
    if (item?.type === "CATEGORIA") {
      const ids = [item?.id, ...(item?.subCategories?.map((e) => e?.id) ?? [])];

      const newIds = InputSelectCategories?.value?.filter((e) => {
        return !ids?.includes(e);
      });
      InputSelectCategories.value = newIds;
      return;
    }
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
      <span class="label-text">Categorias</span>
    </div>
    <ul
      class="list-none flex flex-col max-h-[230px] gap-3 p-0 overflow-x-hidden overflow-y-scroll"
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
                @change="() => handleChange(subCategory.id)"
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
