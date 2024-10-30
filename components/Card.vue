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
  <article class="card container-box shadow-xl">
    <section class="p-4 flex flex-col justify-between gap-4">
      <figure class="w-full h-40 object-cover rounded-t-lg bg-gray-200">
        <img
          :src="
            props?.images?.[0]?.image_url ??
            'https://cemacogt.vtexassets.com/arquivos/ids/359230-800-800?v=638438976140270000&width=800&height=800&aspect=true'
          "
          alt=""
          class="w-full h-full object-contain mix-blend-darken"
        />
      </figure>
      <p class="font-bold text-md text-title h-[50px]">
        {{ capitalizeText(props?.name) }}
      </p>
      <p
        v-if="props?.description?.trim()"
        class="font-normal text-sm text-ellipsis line-clamp-3 h-[60px]"
      >
        {{ props?.description }}
      </p>
      <p v-else class="h-[60px] font-normal text-sm text-ellipsis line-clamp-3">
        No hay descripcion disponible.
      </p>
      <p class="text-xs">Disponible en:</p>
      <div class="flex flex-row gap-2 flex-wrap min-h-[25px]">
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
      <button @click="() => emit('buynow')" class="btn btn-neutral">
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
