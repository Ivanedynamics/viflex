<script setup lang="ts">
import { defineProps } from "vue";
import type { IColor, IImage } from "~/types/back";
type Props = {
  id: string;
  existThisProductInCart: boolean;
  name: string;
  description: string;
  colors: IColor[];
  images: IImage[];
};
const props = defineProps<Props>();
const emit = defineEmits(["add_cart", "buynow"]);
</script>

<template>
  <article
    class="relative border w-full bg-white rounded-lg overflow-hidden h-fit"
  >
    <figure class="w-full h-[260px] bg-gray-200 p-8">
      <img
        :src="
          props?.images?.[0]?.image_url ??
          'https://cemacogt.vtexassets.com/arquivos/ids/359230-800-800?v=638438976140270000&width=800&height=800&aspect=true'
        "
        alt=""
        srcset=""
        class="w-full h-full object-contain mix-blend-darken"
      />
    </figure>
    <section class="p-4 gap-2 flex flex-col justify-between">
      <section>
        <p class="font-bold text-md text-title">
          {{ capitalizeText(props?.name) }}
        </p>
        <p class="font-normal text-sm">
          {{ props?.description }}
        </p>
      </section>
      <p class="text-xs">Disponible en:</p>
      <div class="flex flex-row gap-2 flex-wrap">
        <figure
          v-for="color in props?.colors?.slice(0, 5)"
          :style="{
            width: '25px',
            height: '25px',
            backgroundColor: color?.code_hex,
            borderRadius: '4px',
            border: '1px solid gray',
          }"
        ></figure>
        <figure
          v-if="props?.colors?.length > 5"
          class="flex justify-center items-center"
          :style="`
            width: 25px;
            height: 25px;
          `"
        >
          +{{ props?.colors?.slice(5, props?.colors?.length)?.length }}
        </figure>
      </div>
      <button
        @click="() => emit('buynow')"
        :class="'w-full text-sm flex flex-row justify-center items-center gap-2 bg-primary hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded'"
      >
        Ver Producto
      </button>
    </section>
  </article>
</template>

<style scoped>
.text-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
  text-overflow: ellipsis;
}
</style>
