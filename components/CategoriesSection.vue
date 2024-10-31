<script setup lang="ts">
import type { ICategory } from "~/types/back";

const { data } = useFetch<{ categories: ICategory[] }>("/api/categories");
const router = useRouter();

const categories = computed(() => {
  return [
    {
      id: "86135147-3b26-4f5d-884c-5952cecb6ee4",
      label: "Vinilos de PVC",
      q: "pvc",
      image: "extra/products/zoclo_vinilico.jpg",
      description:
        "Vinilos de PVC ideales para revestimientos y decoraciones duraderas.",
    },
    {
      id: "38d51de0-d9c4-41cf-9bb1-df6758e91904",
      label: "Tela Mosquitera",
      q: "tela",
      image: "extra/products/tela_mosquitera_fibra_de_vidrio.jpg",
      description:
        "Tela mosquitera de fibra de vidrio que evita la entrada de insectos sin bloquear la ventilación.",
    },
    {
      id: "2e55e657-a284-4063-b67d-b7363f88c577",
      label: "Guarda Polvo",
      q: "polvo",
      image: "extra/products/guardapolvo.jpg",
      description:
        "Guardapolvo eficaz para proteger tus espacios del polvo y el frío.",
    },
    {
      id: "be46d57c-451d-458f-a668-b11202e25655",
      label: "Empaques de Vinil",
      q: "vinil",
      image: "extra/products/empaques_de_vinil.jpg",
      description:
        "Empaques de vinil que ofrecen un sellado perfecto para ventanas y puertas.",
    },
  ];
});
</script>

<template>
  <section class="flex-col pt-10 flex items-center justify-center px-3 mt-16">
    <div
      class="w-full max-w-[1240px] items-center justify-center flex flex-col"
    >
      <p class="font-bold text-2xl">Mantén Tu Hogar Seguro y Atractivo con:</p>
      <ul
        class="grid grid-cols-4 mobile_s:gap-4 mobile_s:grid-cols-1 mobile_l:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-8 mt-8"
      >
        <li v-for="item in categories" :key="item.id">
          <div
            class="dark:bg-slate-800 bg-[#fff] rounded-lg shadow-xl flex flex-col gap-2 p-4"
          >
            <ImagePreviewCard :image_url="item?.image" custom-css="h-[150px]" />

            <p class="font-bold">{{ item?.label }}</p>
            <p class="text-base h-20">
              {{ item?.description }}
            </p>
            <NuxtLink :to="`/productos?q=${item?.q}`" class="btn btn-neutral">
              <p>Ver Productos</p>
            </NuxtLink>
          </div>
        </li>
        <!-- <img
          src="public/bg2.jpg"
          class="h-[250px] w-full object-cover rounded-lg"
        />
        <img
          src="public/bg.jpg"
          class="h-[250px] w-full object-cover rounded-lg"
        />
        <img
          src="public/extra/1-empty-loft-with-steps.jpg"
          class="h-[250px] w-full object-cover rounded-lg mobile_s:hidden tablet:flex"
        />
        <img
          src="public/extra/product/empaque_de_vinil.png"
          class="h-[250px] w-full object-cover rounded-lg mobile_s:hidden tablet:flex"
        /> -->
      </ul>
    </div>
  </section>
</template>
