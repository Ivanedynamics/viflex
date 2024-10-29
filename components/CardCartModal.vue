<script setup lang="ts">
import type { IProductCart } from "~/store/cart";
import { capitalizeText } from "~/utils/capitalize";

const props = defineProps<IProductCart>();

const { product, quantity, selection } = toRefs(props);

const emit = defineEmits(["increment", "decrease", "delete"]);
// const quantity = computed(() => props?.quantity);

const listAspect = [
  {
    id: 1,
    label: "Presentación",
    value: selection?.value?.presentacion?.value,
  },
  {
    id: 2,
    label: "Medida",
    value: selection?.value?.medida?.name,
  },
  {
    id: 3,
    label: "Color",
    value: selection?.value?.color?.nombre,
  },
];
</script>

<template>
  <article class="h-full min-h-[100px] grid grid-cols-4 gap-4 grid-rows-1">
    <figure class="w-full bg-gray-200 rounded-md h-[100px]">
      <img
        v-if="product?.images?.[0]?.image_url"
        :src="product?.images?.[0]?.image_url"
        class="w-full h-full object-contain mix-blend-darken select-none"
      />
    </figure>
    <section class="flex flex-col col-span-3 h-full gap-2">
      <div class="h-full flex flex-col gap-2">
        <NuxtLink :to="`/productos/${product?.id}`">
          <p class="text font-bold text-md capitalize-text hover:underline">
            {{ capitalizeText(product?.name) }}
          </p>
        </NuxtLink>
        <ul class="flex flex-col gap-1">
          <li v-for="item in listAspect">
            <p class="text text-sm">
              <strong>{{ item?.label }}:</strong>
              {{ capitalizeText(item?.value) }}
            </p>
          </li>
        </ul>
      </div>
      <div class="flex flex-row w-full justify-between">
        <div class="flex flex-row">
          <button
            @click="emit('decrease', props?.product?.id)"
            :class="'text-sm flex flex-row justify-center items-center gap-2   hover:bg-gray-200 text-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded'"
          >
            -
          </button>
          <div
            :class="'text-sm flex flex-row justify-center items-center gap-2   font-semibold  py-2 px-4'"
          >
            <p class="p-0 line-height-1 m-0">
              {{ quantity }}
            </p>
          </div>
          <button
            @click="emit('increment', props?.product?.id)"
            :class="'text-sm flex flex-row justify-center items-center gap-2   hover:bg-gray-200 text-black font-semibold  py-2 px-4 border border-white hover:border-transparent rounded'"
          >
            +
          </button>
        </div>
        <button
          @click="emit('delete', props?.product?.id)"
          :class="'text-sm flex flex-row justify-center items-center gap-2   hover:bg-gray-200 text-black font-semibold  p-2  border border-white hover:border-transparent rounded'"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
              fill="red"
            />
          </svg>
        </button>
      </div>
    </section>
  </article>
</template>
