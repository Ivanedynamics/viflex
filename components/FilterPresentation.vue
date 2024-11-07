<script setup lang="ts">
import { InputSelectPresentation } from "@/composables/filter_product.js";
import type { IPresentation } from "~/server/api/models";

const { data } = useFetch<{ presentation: IPresentation[] }>(
  "/api/presentation"
);

const handleChange = (id: string) => {
  if (InputSelectPresentation?.value?.find((e) => id === e)) {
    const snew = InputSelectPresentation.value?.filter((e) => id !== e);
    InputSelectPresentation.value = snew;
    return;
  }
  const newv = [...InputSelectPresentation.value, id];
  InputSelectPresentation.value = newv;
};
</script>
<template>
  <section class="mt-3">
    <div class="label py-2">
      <span class="label-text"
        >Presentacion ({{ InputSelectPresentation?.length }})</span
      >
    </div>
    <ul
      class="list-none flex flex-col max-h-[20rem] gap-2 p-0 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="color in data?.presentation"
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
              :checked="InputSelectPresentation?.includes(color.id)"
            />
            <span class="label-text uppercase text-sm font-bold">
              {{ color.value }}
            </span>
          </div>
        </label>
      </li>
    </ul>
  </section>
</template>
