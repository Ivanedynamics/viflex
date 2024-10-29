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
  <div class="min-h-[120px] border rounded-md max-h-[620px] bg-white">
    <header class="sticky top-0 bg-white p-4">
      <p class="font-bold text-lg">Buscar producto</p>
    </header>
    <div class="bg-slate-600 w-auto h-[0.5px] opacity-15 mx-2"></div>
    <form
      action=""
      method="get"
      class="p-4 grid grid-cols-3 gap-2"
      @submit="handleSubmit"
    >
      <div class="relative col-span-3">
        <div
          class="absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="inputTextG"
          type="search"
          id="default-search"
          class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary"
          placeholder="Busca un producto..."
        />
      </div>
    </form>
  </div>
</template>
