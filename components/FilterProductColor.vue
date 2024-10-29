<script setup lang="ts">
const { data } = useFetch<{ colors: IColor[] }>("/api/colors");

import { selectedColors } from "@/composables/filter_product.js";
import type { IColor } from "~/types/back";

const handleChange = (id: string) => {
  if (selectedColors?.value?.find((e) => id === e)) {
    const snew = selectedColors.value?.filter((e) => id !== e);
    selectedColors.value = snew;
    return;
  }
  const newv = [...selectedColors.value, id];
  selectedColors.value = newv;
};
</script>
<template>
  <div class="">
    <header class="sticky top-0 p-4">
      <p class="card-title text-xs">Colores</p>
    </header>
    <div class="bg-slate-600 w-auto h-[0.5px] opacity-15 mx-2"></div>
    <ul
      class="py-4 list-none flex flex-col max-h-[200px] gap-6 p-4 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="color in data?.colors"
        :key="color.id"
        class="flex flex-row gap-2"
      >
        <label
          :for="`color-${color.id}`"
          class="label cursor-pointer gap-2 flex flex-row items-start justify-between w-full"
        >
          <div class="flex flex-row gap-2 w-fit">
            <input
              type="checkbox"
              class="checkbox"
              :id="`color-${color.id}`"
              @change="() => handleChange(color.id)"
              :checked="selectedColors?.includes(color.id)"
            />
            <span class="label-text uppercase">
              {{ color.nombre }}
            </span>
          </div>
          <div
            class="rounded-md"
            :style="{
              width: '24px',
              height: '24px',
              backgroundColor: color.code_hex,
              border: '1px solid gray',
            }"
          ></div>
        </label>
      </li>
    </ul>
  </div>
</template>
