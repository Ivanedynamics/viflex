<script setup lang="ts">
import type { ICategory } from "~/types/back";

const { data } = useFetch<{ categories: ICategory[] }>("/api/categories");
const router = useRouter();
</script>

<template>
  <section class="flex-col pt-10 flex items-center justify-center px-3">
    <div class="w-full max-w-[1240px]">
      <div class="flex flex-col pb-4">
        <p class="font-bold text-2xl">Categorias</p>
      </div>
      <ul class="grid grid-cols-6 gap-4">
        <NuxtLink
          v-for="item in data?.categories?.slice(0, 12)"
          :to="`/productos?q=&colores=&categorias=${item?.id}`"
        >
          <div
            class="border border-primary w-full h-full p-4 rounded-lg items-center justify-center flex"
          >
            <p class="text-primary font-bold text-sm">{{ item?.nombre }}</p>
          </div>
        </NuxtLink>
      </ul>
    </div>
  </section>
</template>
