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
        <form
          @submit="handleSearch"
          class="relative flex flex-row bg-white rounded-md p-2 gap-4"
        >
          <input
            type="text"
            class="w-[20rem] h-[25px]"
            placeholder="Busca productos y cotiza..."
            v-model="inputRef"
          />
          <button class="w-[25px] h-[25px]" type="submit">
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.4999 6.9999C11.4999 7.59085 11.3835 8.17601 11.1574 8.72197C10.9312 9.26794 10.5997 9.76401 10.1819 10.1819C9.76401 10.5997 9.26794 10.9312 8.72197 11.1574C8.17601 11.3835 7.59085 11.4999 6.9999 11.4999C6.40895 11.4999 5.82379 11.3835 5.27782 11.1574C4.73186 10.9312 4.23578 10.5997 3.81792 10.1819C3.40005 9.76401 3.06859 9.26794 2.84244 8.72197C2.61629 8.17601 2.4999 7.59085 2.4999 6.9999C2.4999 5.80642 2.974 4.66183 3.81792 3.81792C4.66183 2.974 5.80642 2.4999 6.9999 2.4999C8.19337 2.4999 9.33796 2.974 10.1819 3.81792C11.0258 4.66183 11.4999 5.80642 11.4999 6.9999ZM10.6799 11.7399C9.47427 12.6759 7.95726 13.1172 6.4377 12.974C4.91813 12.8309 3.51024 12.114 2.50065 10.9693C1.49105 9.82461 0.955648 8.3382 1.00343 6.81265C1.05122 5.2871 1.6786 3.8371 2.75785 2.75785C3.8371 1.6786 5.2871 1.05122 6.81265 1.00343C8.3382 0.955648 9.82461 1.49105 10.9693 2.50065C12.114 3.51024 12.8309 4.91813 12.974 6.4377C13.1172 7.95726 12.6759 9.47427 11.7399 10.6799L14.5299 13.4699C14.6036 13.5386 14.6627 13.6214 14.7037 13.7134C14.7447 13.8054 14.7667 13.9047 14.7685 14.0054C14.7703 14.1061 14.7517 14.2061 14.714 14.2995C14.6763 14.3929 14.6202 14.4777 14.5489 14.5489C14.4777 14.6202 14.3929 14.6763 14.2995 14.714C14.2061 14.7517 14.1061 14.7703 14.0054 14.7685C13.9047 14.7667 13.8054 14.7447 13.7134 14.7037C13.6214 14.6627 13.5386 14.6036 13.4699 14.5299L10.6799 11.7399Z"
                fill="black"
              />
            </svg>
          </button>
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
