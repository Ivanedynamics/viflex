<script setup lang="ts">
const { data } = useFetch("/api/colors");

import { selectedColors } from "@/composables/filter_product.js";

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
  <div class="min-h-[120px] border rounded-md max-h-[620px] bg-white">
    <header class="sticky top-0 bg-white p-4">
      <p class="font-bold text-lg">Colores</p>
    </header>
    <div class="bg-slate-600 w-auto h-[0.5px] opacity-15 mx-2"></div>
    <ul
      class="py-4 list-none flex flex-col max-h-[320px] gap-6 p-4 overflow-x-hidden overflow-y-scroll"
    >
      <li
        v-for="color in data?.colors"
        :key="color.id"
        class="flex flex-row gap-2"
      >
        <input
          type="checkbox"
          name=""
          :id="`color-${color.id}`"
          @change="() => handleChange(color.id)"
          :checked="selectedColors?.includes(color.id)"
        />
        <label
          :for="`color-${color.id}`"
          class="flex flex-row gap-2 w-full justify-between align-items-center"
        >
          <p>
            {{ color.nombre }}
          </p>
          <div
            class="rounded-md"
            :style="{
              width: '20px',
              height: '20px',
              backgroundColor: color.code_hex,
              border: '1px solid gray',
            }"
          ></div>
        </label>
      </li>
    </ul>
  </div>
</template>
