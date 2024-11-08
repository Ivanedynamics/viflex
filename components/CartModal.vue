<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { closeSidebar } from "~/utils/sidebar";
import { handleCloseCart } from "~/composables/drawer";
const router = useRouter();

const store = useCartStore();
const { productCart, showCart } = storeToRefs(store);

// function showDialog() {
//   document.body.classList.add("no-scroll");
//   // Muestra el diálogo
// }

// function closeDialog() {
//   document.body.classList.remove("no-scroll");
//   // Oculta el diálogo
// }

const handleSearchProducts = () => {
  router.push("/productos");
  handleCloseCart();
};
</script>
<template>
  <div class="drawer drawer-end" style="z-index: 99999999 !important">
    <input id="my_drawer_app" type="checkbox" class="drawer-toggle" />
    <div
      class="drawer-side"
      style="z-index: 99999999 !important; overflow: hidden; overflow-y: hidden"
    >
      <label
        for="my_drawer_app"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div
        class="menu laptop:pb-5 mobile_s:pb-10 bg-white dark:bg-slate-900 z-50 text-base-content min-h-full max-w-[420px] w-full p-0 gap-4 flex flex-col"
        style="
          height: 100dvh;
          display: grid;
          align-items: start;
          grid-template-rows: auto 1fr auto;
        "
      >
        <!-- Sidebar content here -->
        <section
          class="flex flex-row justify-between items-center min-h-[75px] px-4 sticky top-0 dark:bg-slate-800 bg-white z-50"
        >
          <p class="font-bold text-lg">Resumen de Cotización</p>
          <button class="btn btn-ghost" @click="handleCloseCart">
            <svg
              width="20"
              height="20"
              viewBox="0 0 117 117"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M58.4999 65.3932L86.0778 92.9711C86.9972 93.8591 88.2287 94.3505 89.5069 94.3394C90.7851 94.3283 92.0078 93.8156 92.9117 92.9117C93.8155 92.0079 94.3282 90.7852 94.3393 89.507C94.3504 88.2287 93.8591 86.9973 92.9711 86.0779L65.3932 58.5L92.9711 30.9221C93.8591 30.0027 94.3504 28.7712 94.3393 27.493C94.3282 26.2148 93.8155 24.9921 92.9117 24.0883C92.0078 23.1844 90.7851 22.6717 89.5069 22.6606C88.2287 22.6495 86.9972 23.1408 86.0778 24.0289L58.4999 51.6067L30.9221 24.0289C29.9985 23.1628 28.7742 22.69 27.5082 22.7106C26.2423 22.7311 25.034 23.2434 24.139 24.139C23.2441 25.0346 22.7326 26.2433 22.713 27.5092C22.6933 28.7752 23.167 29.9992 24.0337 30.9221L51.6067 58.5L24.0288 86.0779C23.5632 86.5276 23.1918 87.0655 22.9363 87.6603C22.6808 88.255 22.5463 88.8947 22.5407 89.542C22.5351 90.1893 22.6584 90.8313 22.9036 91.4304C23.1487 92.0295 23.5107 92.5738 23.9684 93.0315C24.4261 93.4893 24.9704 93.8513 25.5695 94.0964C26.1687 94.3415 26.8106 94.4648 27.4579 94.4592C28.1052 94.4536 28.7449 94.3191 29.3397 94.0636C29.9344 93.8081 30.4724 93.4367 30.9221 92.9711L58.4999 65.3932Z"
                fill="black"
                class="icon-fill"
              />
            </svg>
          </button>
        </section>
        <section
          v-if="productCart?.length === 0"
          class="p-4 flex items-center justify-center flex-col gap-3"
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black dark:stroke-white"
            />
            <path
              d="M8.99999 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H7.99999C3.72999 8 3.02999 9.99 3.29999 12.43L4.04999 18.43C4.25999 20.39 4.97999 22 8.99999 22Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black dark:stroke-white"
            />
            <path
              d="M15.4955 12H15.5045"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black dark:stroke-white"
            />
            <path
              d="M8.49451 12H8.50349"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black dark:stroke-white"
            />
          </svg>

          <p class="text-lg"><strong>¡Tu cotización está vacía!</strong></p>
          <p class="text-center text-base">
            Explora todos los productos disponibles <br />
            y agrega algunos a tu cotización en la tienda.
          </p>
          <button
            @click="handleSearchProducts"
            class="btn btn-primary text-white"
          >
            Buscar productos
          </button>
        </section>
        <section
          class="flex flex-col h-full gap-4 overflow-hidden overflow-y-scroll px-4"
        >
          <template v-for="p in productCart" :key="p?.id">
            <CardCartModal
              :product="p?.product"
              :quantity="p?.quantity"
              :selection="p?.selection"
              @decrease="() => store.decreaseProduct(p?.id)"
              @increment="() => store.incrementProduct(p?.id)"
              @delete="(e) => store.deleteProduct(p?.id)"
            />
          </template>
        </section>
        <section
          v-if="productCart?.length > 0"
          class="flex flex-row gap-4 px-3"
        >
          <NuxtLink
            @click="handleCloseCart"
            to="/cotizar"
            class="btn btn-primary w-full"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 45 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.375 34.8438V31.75H12.9375L14.625 28.6562L40.5 26.125L45 9.25H10.4063L8.4375 0.8125H0V3.625H6.1875L12.0938 27.25L8.4375 34.5625V38.7812C8.4375 41.0313 10.4062 43 12.6562 43C14.9063 43 16.875 41.0313 16.875 38.7812C16.875 36.5312 14.9063 34.5625 12.6562 34.5625H33.75V38.7812C33.75 41.0313 35.7187 43 37.9688 43C40.2188 43 42.1875 41.0313 42.1875 38.7812C42.1875 36.8125 41.0625 35.4063 39.375 34.8438Z"
                fill="white"
              />
            </svg>

            <p class="text-base font-semibold text-white">Cotizar Ahora</p>
          </NuxtLink>
        </section>
      </div>
    </div>
  </div>
  <!-- <main
    class="fixed w-dvw h-dvh top-0 left-0 z-[99999999999999999] flex flex-col items-end"
    :style="{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: showCart ? 'flex' : 'none',
    }"
    @click="handleBackgroundClose"
  >
    <aside
      id="sidebar_app"
      :class="`sidebar card card-compact bg-base-100 rounded-none  shadow-xl max-w-[440px]  w-dvw h-dvh`"
      @click="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      "
    >
      <section class="flex flex-col h-full pb-5">


      </section>
    </aside>
  </main> -->
</template>

<style>
/* Clase para desactivar el scroll */
.no-scroll {
  overflow: hidden;
}
.sidebar {
  transition: transform 0.3s ease; /* Animación de movimiento */
}
.sidebar.open {
  animation: slideIn 0.3s ease forwards;
}

.sidebar.close {
  animation: slideOut 0.3s ease forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%); /* Fuera de la pantalla */
  }
  to {
    transform: translateX(0); /* Totalmente visible */
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0); /* Totalmente visible */
  }
  to {
    transform: translateX(100%); /* Fuera de la pantalla */
  }
}
</style>
