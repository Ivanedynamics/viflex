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
  <div>
    <div class="label">
      <span class="label-text">Tipos de colores</span>
    </div>
    <ul
      class="list-none flex flex-col max-h-[200px] gap-6 p-2 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="color in data?.colors"
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
              :checked="selectedColors?.includes(color.id)"
            />
            <span class="label-text uppercase">
              {{ color.nombre }}
            </span>
          </div>
          <div
            class="rounded-md"
            :style="{
              width: '28px',
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
