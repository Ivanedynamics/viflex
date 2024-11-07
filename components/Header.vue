<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { headerOptions } from "~/assets/mocks/headeroptions";
import { handleOpenCart } from "~/composables/drawer";
import { handleOpenSidebar } from "~/composables/sidebar";
import { CONTACT_COFING } from "~/mocks/contact";
const router = useRouter();
const parmas = useRoute();
const store = useCartStore();
const { totalProductsInCart } = storeToRefs(store);

const inputRef = ref("");

const handleSearch = (ev: Event) => {
  ev?.preventDefault?.();
  router.push({
    path: "/productos",
    query: {
      ...parmas.query,
      buscar: inputRef?.value?.trim(),
    },
  });
};
</script>

<template>
  <header
    class="bg-primary z-10 top-0 sticky flex flex-col items-center justify-center"
  >
    <div
      class="w-full max-w-[1240px] flex flex-row items-center justify-between h-full min-h-[75px] px-4"
    >
      <div class="flex flex-row items-center gap-8">
        <button
          class="h-full relative text-primary font-semibold p-2 rounded mobile_s:flex tablet:flex laptop:hidden"
          @click="handleOpenSidebar"
          id="menu_opciones"
          aria-label="menu_button"
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
              <p class="text-base">{{ hp.label }}</p>
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
          class="relative flex max-w-sm w-full flex-row gap-4 mobile_s:hidden mobile_m:hidden mobile_l:hidden tablet:flex laptop:flex"
        >
          <label class="input input-bordered flex items-center gap-2 w-full">
            <input
              v-model="inputRef"
              type="text"
              class="grow w-full"
              placeholder="Busca un producto."
            />
            <button type="button" @click="handleSearch">
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
            </button>
          </label>
        </form>
        <button
          @click="handleOpenCart"
          class="relative text-primary font-semibold p-2 rounded"
          aria-label="carrito_cotizacion"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 323 303"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M282.625 244.456V222.25H92.8625L104.975 200.044L290.7 181.875L323 60.75H74.6937L60.5625 0.1875H0V20.375H44.4125L86.8063 189.95L60.5625 242.438V272.719C60.5625 288.869 74.6938 303 90.8438 303C106.994 303 121.125 288.869 121.125 272.719C121.125 256.569 106.994 242.438 90.8438 242.438H242.25V272.719C242.25 288.869 256.381 303 272.531 303C288.681 303 302.812 288.869 302.812 272.719C302.812 258.588 294.738 248.494 282.625 244.456Z"
              fill="white"
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
    <div
      class="w-full bg-info py-2 text-black items-center flex justify-center mobile_s:hidden tablet:flex"
    >
      <a :href="`tel:${CONTACT_COFING.phonenumber.value}`">
        <p class="text-sm font-medium">
          ¿Necesita ayuda? Llámenos: {{ CONTACT_COFING.phonenumber.label }}
        </p>
      </a>
    </div>
  </header>
</template>
