<script setup lang="ts">
import type { IFrontProduct } from "~/types/front";
const router = useRouter();
import {
  InputSearch,
  InputSelectColors,
  InputSelectCategories,
  InputSelectMeasures,
  InputSelectPresentation,
} from "@/composables/filter_product";
import FilterSearchQuery from "./FilterSearchQuery.vue";
import FilterProductType from "./FilterCategories.vue";
import FilterProductColor from "./FilterColors.vue";

const { data: products, status } = await useAsyncData<{
  products: IFrontProduct[];
}>(
  "getproducts",
  () =>
    $fetch(`/api/products`, {
      params: {
        searchByName: InputSearch.value,
        searchByCategory: JointParams(InputSelectCategories?.value),
        searchByColor: JointParams(InputSelectColors?.value),
        searchByMeasures: JointParams(InputSelectMeasures?.value),
        ssearchbyPresentation: JointParams(InputSelectPresentation?.value),
      },
    }),
  {
    watch: [
      InputSearch,
      InputSelectColors,
      InputSelectCategories,
      InputSelectMeasures,
      InputSelectPresentation,
    ],
    deep: true,
    lazy: true,
  }
);

const handleDialogFilter = () => {
  //@ts-ignore
  document.getElementById("my_modal_1")?.showModal?.();
};
</script>

<template>
  <section class="flex-col pt-5 flex items-center justify-center px-3">
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box dark:bg-slate-800 bg-[#fff]">
        <form method="dialog">
          <div class="flex flex-row w-full justify-between items-center">
            <p class="font-bold">Filtrar Por</p>
            <button class="btn btn-ghost">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                  fill="black"
                  class="icon-fill"
                />
              </svg>
            </button>
          </div>

          <FilterSearchQuery />
          <FilterProductType />
          <FilterProductColor />
        </form>
      </div>
    </dialog>
    <div
      class="w-full max-w-[1240px] grid grid-cols-4 relative gap-8 mobile_s:flex mobile_s:gap-4 laptop:grid"
    >
      <div class="relative h-full w-full mobile_s:hidden laptop:flex">
        <FilterProducts />
      </div>

      <article class="col-span-3">
        <div class="flex flex-row justify-between items-center">
          <p class="font-bold text-2xl pt-4 mobile_s:text-lg mobile_l:text-xl">
            Resultados de la búsqueda ({{ products?.products?.length }})
          </p>
          <button
            class="btn btn-neutral mobile_s:flex laptop:hidden"
            @click="handleDialogFilter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.40002 2.09998H18.6C19.7 2.09998 20.6 2.99998 20.6 4.09998V6.29998C20.6 7.09998 20.1 8.09998 19.6 8.59998L15.3 12.4C14.7 12.9 14.3 13.9 14.3 14.7V19C14.3 19.6 13.9 20.4 13.4 20.7L12 21.6C10.7 22.4 8.90002 21.5 8.90002 19.9V14.6C8.90002 13.9 8.50002 13 8.10002 12.5L4.30002 8.49998C3.80002 7.99998 3.40002 7.09998 3.40002 6.49998V4.19998C3.40002 2.99998 4.30002 2.09998 5.40002 2.09998Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.93 2.09998L6 9.99998"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div
          v-if="
            status === 'success' && Number(products?.products?.length) === 0
          "
        >
          <p>No encontramos resultados para tu búsqueda.</p>
        </div>
        <div v-if="status === 'pending'">
          <ul
            class="grid grid-cols-4 w-full mobile_s:gap-4 mobile_s:grid-cols-1 mobile_l:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-2 mt-4"
          >
            <template v-for="item in 4">
              <li
                class="dark:bg-slate-800 bg-[#fff] rounded-lg shadow-xl w-full"
              >
                <div class="p-4 flex flex-col justify-between gap-4 w-full">
                  <div
                    class="skeleton bg-gray-200 dark:bg-slate-600 w-full h-40 rounded-lg"
                  ></div>
                  <div
                    class="skeleton bg-gray-200 dark:bg-slate-600 w-full h-5 rounded-lg"
                  ></div>
                  <div
                    class="skeleton bg-gray-200 dark:bg-slate-600 w-24 h-5 rounded-lg"
                  ></div>
                  <div
                    class="skeleton bg-gray-200 dark:bg-slate-600 w-full h-10 rounded-lg"
                  ></div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div
          v-if="status === 'success' && Number(products?.products?.length) > 0"
          class="grid grid-cols-4 w-full mobile_s:gap-4 mobile_s:grid-cols-1 mobile_l:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-2 mt-4"
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
