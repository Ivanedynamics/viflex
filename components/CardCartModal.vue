<script setup lang="ts">
import type { IProductCart } from "~/store/cart";
import { capitalizeText } from "~/utils/capitalize";

const props = defineProps<IProductCart>();

const { product, quantity, selection } = toRefs(props);

const emit = defineEmits(["increment", "decrease", "delete"]);

const listAspect = computed(() => {
  return [
    selection?.value?.presentacion?.value,
    selection?.value?.medida?.name,
    selection?.value?.color?.nombre,
  ];
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <ImagePreviewCard
      :image_url="product?.images?.[0]?.image_url"
      custom-css="h-[240px]"
    />
    <div class="flex flex-col gap-4 w-full">
      <section class="flex flex-col gap-2">
        <NuxtLink :to="`/productos/${product?.id}`">
          <p
            class="font-bold text-sm capitalize-text hover:underline text-ellipsis line-clamp-2 h-full max-h-[40px]"
          >
            {{ capitalizeText(product?.name) }}
          </p>
        </NuxtLink>
        <p class="text-sm opacity-80 text-ellipsis line-clamp-3">
          {{ product?.descripcion }}
        </p>
        <p class="text-sm">
          {{ capitalizeText(listAspect?.join?.(" • ") ?? "") }}
        </p>
      </section>
      <section class="flex flex-row w-full justify-between">
        <div class="flex flex-row">
          <button
            @click="emit('decrease', props?.product?.id)"
            class="w-10 h-10 bg-slate-700 flex items-center justify-center font-bold border rounded-md"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12H18"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <p class="w-20 h-10 flex items-center justify-center font-bold">
            {{ quantity }}
          </p>
          <button
            @click="emit('increment', props?.product?.id)"
            class="w-10 h-10 flex bg-slate-700 items-center justify-center font-bold border rounded-md"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12H18"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 18V6"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <button @click="emit('delete', props?.product?.id)" class="w-10 h-10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
              stroke="red"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
              stroke="red"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
              stroke="red"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.33 16.5H13.66"
              stroke="red"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 12.5H14.5"
              stroke="red"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </section>
    </div>
  </div>
</template>

<style scoped>
.text-title_cart {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
  text-overflow: ellipsis;
}
</style>
