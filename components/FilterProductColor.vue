<script setup lang="ts">
import { InputSelectColors } from "@/composables/filter_product.js";
import type { IColor } from "~/server/api/models";

const { data } = useFetch<{ colors: IColor[] }>("/api/colors");

const handleChange = (id: string) => {
  if (InputSelectColors?.value?.find((e) => id === e)) {
    const snew = InputSelectColors.value?.filter((e) => id !== e);
    InputSelectColors.value = snew;
    return;
  }
  const newv = [...InputSelectColors.value, id];
  InputSelectColors.value = newv;
};
</script>
<template>
  <section class="mt-3">
    <div class="label py-2">
      <span class="label-text">Tipos de colores</span>
    </div>
    <ul
      class="list-none flex flex-col max-h-[200px] gap-2 p-0 overflow-x-hidden overflow-y-scroll"
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
              :checked="InputSelectColors?.includes(color.id)"
            />
            <span class="label-text uppercase text-sm font-bold">
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
  </section>
</template>
