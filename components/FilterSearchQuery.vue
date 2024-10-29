<script setup lang="ts">
import {
  inputTextG,
  selectedCategories,
  selectedColors,
} from "@/composables/filter_product.js";
const router = useRouter();
const handleSubmit = (e: Event) => {
  e.preventDefault();
};

const route = useRoute();

onMounted(() => {
  selectedCategories.value =
    (route?.query?.categorias as string)?.split(",") ?? [];
  selectedColors.value = (route?.query?.colores as string)?.split(",") ?? [];
  inputTextG.value = (route.query?.q as string) ?? "";
});

watch(
  () => route.query?.q,
  () => {
    router.push({
      ...route,
      query: {
        ...route.query,
        q: route.query?.q,
      },
    });
    inputTextG.value = (route.query?.q as string) ?? "";
  },
  {
    deep: true,
  }
);

watch(
  [inputTextG, selectedColors, selectedCategories],
  ([curr, colors, categories]) => {
    router.push(
      `/productos?q=${curr}&colores=${colors?.join(
        ","
      )}&categorias=${categories?.join(",")}`
    );
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="">
    <header class="sticky top-0 p-4">
      <p class="card-title text-xs">Buscar producto</p>
    </header>
    <div class="bg-slate-600 w-auto h-[0.5px] opacity-15 mx-2"></div>
    <form action="" method="get" class="p-4" @submit="handleSubmit">
      <label class="input input-bordered flex items-center gap-2 w-full">
        <input
          v-model="inputTextG"
          type="text"
          class="grow w-full"
          placeholder="Busca un producto."
        />
        <svg
          width="25"
          height="25"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </form>
  </div>
</template>
