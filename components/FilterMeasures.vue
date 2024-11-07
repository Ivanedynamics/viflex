<script setup lang="ts">
import { InputSelectMeasures } from "@/composables/filter_product.js";
import type { IMeasure } from "~/server/api/models";

const { data } = useFetch<{ measures: IMeasure[] }>("/api/measures");

const handleChange = (id: string) => {
  if (InputSelectMeasures?.value?.find((e) => id === e)) {
    const snew = InputSelectMeasures.value?.filter((e) => id !== e);
    InputSelectMeasures.value = snew;
    return;
  }
  const newv = [...InputSelectMeasures.value, id];
  InputSelectMeasures.value = newv;
};
</script>
<template>
  <section class="mt-3">
    <div class="label py-2">
      <span class="label-text"
        >Medidas ({{ InputSelectMeasures?.length }})</span
      >
    </div>
    <ul
      class="list-none flex flex-col max-h-[20rem] gap-2 p-0 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="color in data?.measures"
        :key="color.id"
        class="flex flex-row gap-2 items-start justify-start"
      >
        <label
          class="label w-full cursor-pointer gap-2 flex flex-row items-start justify-start"
        >
          <div class="flex flex-row gap-2 w-full">
            <input
              type="checkbox"
              class="checkbox checkbox-primary"
              :id="`color-${color.id}`"
              @change="() => handleChange(color.id)"
              :checked="InputSelectMeasures?.includes(color.id)"
            />
            <span class="label-text uppercase text-sm font-bold">
              {{ color.name }}
            </span>
          </div>
        </label>
      </li>
    </ul>
  </section>
</template>
