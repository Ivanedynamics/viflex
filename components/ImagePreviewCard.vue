<script setup lang="ts">
const props = defineProps<{
  image_url: string | undefined | null;
  customCss?: string;
}>();

const { image_url, customCss } = toRefs(props);
</script>

<template>
  <div class="bg-gray-200 rounded-md w-full p-4" :class="customCss">
    <img
      v-if="image_url"
      :src="image_url"
      class="w-full h-full object-contain mix-blend-darken select-none"
    />
    <div v-else class="flex items-center justify-center w-full h-full">
      <div class="flex items-center flex-col justify-center gap-2 flex-wrap">
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
            stroke="#292D32"
            class="stroke-slate-500"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
            stroke="#292D32"
            stroke-width="1.5"
            class="stroke-slate-500"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001"
            stroke="#292D32"
            stroke-width="1.5"
            class="stroke-slate-500"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-slate-900 font-medium text-sm opacity-50 text-center">
          La imagen no esta<br />
          disponible
        </p>
      </div>
    </div>
  </div>
</template>
