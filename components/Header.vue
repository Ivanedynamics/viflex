<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { headerOptions } from "~/assets/mocks/headeroptions";
import { openSidebar } from "~/utils/sidebar";
const router = useRouter();
const store = useCartStore();
const { totalProductsInCart } = storeToRefs(store);

const inputRef = ref("");

const keyStore = "theme_page";
const THEME = {
  light: "light",
  dark: "dark",
};

const handleSearch = (ev: Event) => {
  ev?.preventDefault?.();
  router.push(`/productos?q=${inputRef.value}`);
};

const handleDataTheme = (value: string) => {
  document.querySelector("html")?.setAttribute("data-theme", value);
};

onBeforeMount(() => {
  const theme_persisted = localStorage.getItem(keyStore) ?? THEME.light;
  handleDataTheme(theme_persisted);
});

const toggleTheme = () => {
  const theme_persisted = localStorage.getItem(keyStore) ?? THEME.light;

  if (theme_persisted === THEME.light) {
    handleDataTheme(THEME.dark);
    localStorage.setItem(keyStore, THEME.dark);
    return;
  } else {
    handleDataTheme(THEME.light);
    localStorage.setItem(keyStore, THEME.light);
  }
};
</script>

<template>
  <header
    class="bg-primary z-10 top-0 sticky flex flex-row items-center justify-center h-full min-h-[80px] px-3"
  >
    <div
      class="w-full max-w-[1240px] flex flex-row items-center justify-between tablet:px-4"
    >
      <div class="flex flex-row items-center gap-8">
        <LogoLink />

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
      <div class="flex flex-row items-center gap-4">
        <form
          @submit="handleSearch"
          class="relative flex flex-row gap-4 mobile_s:hidden mobile_m:hidden mobile_l:hidden tablet:hidden laptop:flex"
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

        <label class="swap swap-rotate">
          <!-- this hidden checkbox controls the state -->
          <input
            type="checkbox"
            class="theme-controller"
            value="synthwave"
            @change="toggleTheme"
          />

          <!-- sun icon -->
          <svg
            class="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
              fill="yellow"
            />
          </svg>

          <!-- moon icon -->
          <svg
            class="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
              fill="white"
            />
          </svg>
        </label>
      </div>
    </div>
  </header>
</template>
