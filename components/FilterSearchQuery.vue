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
  <div>
    <form @submit="handleSubmit">
      <div class="form-control w-full">
        <div class="label">
          <span class="label-text">Buscar producto</span>
        </div>
        <label class="input input-bordered w-full flex items-center gap-2">
          <input
            type="text"
            class="grow w-full"
            v-model="inputTextG"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
      </div>
    </form>
  </div>
</template>
