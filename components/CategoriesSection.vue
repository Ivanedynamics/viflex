<script setup lang="ts">
import type { ICategory } from "~/server/api/models";

const { data, status } = useFetch<{ categories: ICategory[] }>(
  "/api/categories/all?display=PAGINA_INICIAL"
);
const router = useRouter();
</script>

<template>
  <section class="flex-col pt-10 flex items-center justify-center px-3 mt-16">
    <div
      class="w-full max-w-[1240px] items-center justify-center flex flex-col"
    >
      <p
        class="font-bold text-2xl text-center mobile_s:text-lg tablet:text-xl laptop:text-2xl"
      >
        Mantén Tu Hogar Seguro y Atractivo con:
      </p>
      <ul
        v-if="status === 'pending'"
        class="grid grid-cols-4 w-full mobile_s:gap-4 mobile_s:grid-cols-1 mobile_l:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-8 mt-8"
      >
        <template v-for="item in 4">
          <li
            class="skeleton h-[200px] bg-gray-200 dark:bg-slate-600 w-full rounded-lg shadow-xl flex flex-col gap-2 p-4"
          ></li>
        </template>
      </ul>
      <ul
        v-if="data?.categories?.length > 0 && status === 'success'"
        class="grid grid-cols-4 w-full mobile_s:gap-4 mobile_s:grid-cols-1 mobile_m:grid-cols-2 mobile_l:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-8 mt-8"
      >
        <li v-for="item in data?.categories" :key="item.id">
          <NuxtLink
            :to="`/productos?categorias=${item?.id}`"
            class="dark:bg-slate-800 bg-[#fff] h-full w-full rounded-lg shadow-xl flex flex-col gap-4 p-4"
          >
            <ImagePreviewCard
              :image_url="item?.primaryPicture"
              custom-css="h-[180px] bg-white"
            />

            <p class="font-bold text-sm">{{ item?.nombre }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
