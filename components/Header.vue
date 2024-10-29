<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { headerOptions } from "~/assets/mocks/headeroptions";
import { openSidebar } from "~/utils/sidebar";
const router = useRouter();
const store = useCartStore();
const { totalProductsInCart } = storeToRefs(store);

const inputRef = ref("");

const handleSearch = (ev: Event) => {
  ev?.preventDefault?.();
  router.push(`/productos?q=${inputRef.value}`);
};
</script>

<template>
  <header
    class="bg-primary z-10 top-0 sticky flex flex-row items-center justify-center h-full min-h-[80px] px-3"
  >
    <div
      class="w-full max-w-[1240px] flex flex-row items-center justify-between"
    >
      <div class="flex flex-row items-center gap-8">
        <LogoLink />

        <ul class="flex flex-row gap-4 items-center justify-center p-0 m-0">
          <li v-for="hp in headerOptions">
            <NuxtLink
              :key="`hp-pts-${hp.id}`"
              :to="hp.link"
              class="font-medium text-md text-white"
            >
              <p class="text-sm">{{ hp.label }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="flex flex-row items-center">
        <form @submit="handleSearch" class="relative flex flex-row gap-4">
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              class="grow"
              v-model="inputRef"
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
        </form>
        <button
          @click="
            () => {
              openSidebar();
              store?.OpenModalCart();
            }
          "
          class="relative text-primary font-semibold p-2 rounded"
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 151 151"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M99.0937 81.7917C99.0937 80.5402 98.5966 79.3399 97.7117 78.455C96.8267 77.5701 95.6265 77.0729 94.375 77.0729H56.625C55.3735 77.0729 54.1733 77.5701 53.2883 78.455C52.4034 79.3399 51.9062 80.5402 51.9062 81.7917C51.9062 83.0431 52.4034 84.2434 53.2883 85.1283C54.1733 86.0133 55.3735 86.5104 56.625 86.5104H94.375C95.6265 86.5104 96.8267 86.0133 97.7117 85.1283C98.5966 84.2434 99.0937 83.0431 99.0937 81.7917ZM99.0937 106.958C99.0937 105.707 98.5966 104.507 97.7117 103.622C96.8267 102.737 95.6265 102.24 94.375 102.24H56.625C55.3735 102.24 54.1733 102.737 53.2883 103.622C52.4034 104.507 51.9062 105.707 51.9062 106.958C51.9062 108.21 52.4034 109.41 53.2883 110.295C54.1733 111.18 55.3735 111.677 56.625 111.677H94.375C95.6265 111.677 96.8267 111.18 97.7117 110.295C98.5966 109.41 99.0937 108.21 99.0937 106.958Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M44.0418 14.1562C39.453 14.1563 35.0522 15.9791 31.8074 19.2239C28.5626 22.4687 26.7397 26.8695 26.7397 31.4583V119.542C26.7397 124.13 28.5626 128.531 31.8074 131.776C35.0522 135.021 39.453 136.844 44.0418 136.844H106.959C111.547 136.844 115.948 135.021 119.193 131.776C122.438 128.531 124.261 124.13 124.261 119.542V50.132C124.261 47.7349 123.48 45.407 122.033 43.4943L103.171 18.529C102.145 17.1707 100.817 16.0689 99.2933 15.3102C97.7693 14.5515 96.0902 14.1565 94.3877 14.1562H44.0418ZM36.1772 31.4583C36.1772 27.1171 39.7006 23.5937 44.0418 23.5937H89.6564V51.2582C89.6564 53.863 91.7704 55.977 94.3752 55.977H114.823V119.542C114.823 123.883 111.3 127.406 106.959 127.406H44.0418C39.7006 127.406 36.1772 123.883 36.1772 119.542V31.4583Z"
              fill="white"
            />
          </svg>
          <div
            v-if="totalProductsInCart > 0"
            class="w-[20px] h-[20px] absolute bg-white rounded-full top-0 right-0 flex justify-center items-center"
          >
            <p class="text-primary font-bold text-xs">
              {{ totalProductsInCart }}
            </p>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>
