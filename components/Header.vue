<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { headerOptions } from "~/assets/mocks/headeroptions";
import { handleOpenCart } from "~/composables/drawer";
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
    class="bg-primary z-10 top-0 sticky flex flex-row items-center justify-center h-full min-h-[65px] px-3"
  >
    <div
      class="w-full max-w-[1240px] flex flex-row items-center justify-between tablet:px-4"
    >
      <div class="flex flex-row items-center gap-8">
        <button
          class="h-full relative text-primary font-semibold p-2 rounded mobile_s:flex tablet:flex laptop:hidden"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7H21"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M3 12H21"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M3 17H21"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div class="mobile_s:hidden tablet:flex">
          <LogoLink />
        </div>

        <ul
          class="flex flex-row gap-4 items-center justify-center p-0 m-0 mobile_s:hidden mobile_m:hidden mobile_l:hidden tablet:hidden laptop:flex"
        >
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
      <div class="mobile_s:flex tablet:hidden">
        <LogoLink />
      </div>

      <div class="flex flex-row items-center gap-4">
        <form
          @submit="handleSearch"
          class="relative flex flex-row gap-4 mobile_s:hidden mobile_m:hidden mobile_l:hidden tablet:flex laptop:flex"
        >
          <label class="input input-bordered flex items-center gap-2 w-full">
            <input
              v-model="inputRef"
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
        <button
          @click="handleOpenCart"
          class="relative text-primary font-semibold p-2 rounded"
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-slate-100"
            />
            <path
              d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-slate-100"
            />
            <path
              d="M8 13H12"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-slate-100"
            />
            <path
              d="M8 17H16"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-slate-100"
            />
          </svg>

          <div
            v-if="totalProductsInCart > 0"
            class="w-[20px] h-[20px] absolute bg-red-500 rounded-full top-0 right-0 flex justify-center items-center"
          >
            <p class="text-white font-bold text-xs">
              {{ totalProductsInCart }}
            </p>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>
