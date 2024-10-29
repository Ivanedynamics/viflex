<script setup lang="ts">
import type { IFrontProduct } from "~/types/front";
const router = useRouter();
import {
  inputTextG,
  selectedCategories,
  selectedColors,
} from "@/composables/filter_product.js";
const { data: products } = await useAsyncData<{
  products: IFrontProduct[];
}>(
  "getproducts",
  () =>
    $fetch(`/api/products`, {
      params: {
        searchByName: inputTextG.value,
        searchByCategory: selectedCategories?.value?.join(","),
        searchByColor: selectedColors?.value?.join(","),
      },
    }),
  {
    watch: [inputTextG, selectedCategories, selectedColors],
    immediate: true,
  }
);
</script>

<template>
  <section class="flex-col pt-5 flex items-center justify-center px-3">
    <div class="w-full max-w-[1240px] grid grid-cols-4">
      <FilterProducts />

      <article class="col-span-3">
        <p class="font-bold text-2xl py-4">Resultados de la búsqueda</p>
        <div
          class="w-full grid grid-cols-3 gap-x-4 gap-y-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 max-[700px]:grid-cols-1"
        >
          <Card
            v-for="product in products?.products"
            :key="product?.id"
            :id="`${product?.id}`"
            :name="`${product?.name}`"
            :description="product?.descripcion"
            :images="product?.images ?? []"
            :colors="product?.color"
            :exist-this-product-in-cart="false"
            @add_cart="() => {}"
            @buynow="() => router.push(`/productos/${product?.id}`)"
          />
        </div>
      </article>
    </div>
  </section>
</template>
