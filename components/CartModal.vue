<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { closeSidebar } from "~/utils/sidebar";

const router = useRouter();

const store = useCartStore();
const { productCart, showCart } = storeToRefs(store);
const handleBackgroundClose = () => {
  closeSidebar();
  setTimeout(() => {
    store.CloseModalCart();
  }, 300);
};

function showDialog() {
  document.body.classList.add("no-scroll");
  // Muestra el diálogo
}

function closeDialog() {
  document.body.classList.remove("no-scroll");
  // Oculta el diálogo
}

const handleSearchProducts = () => {
  router.push("/productos");
  handleBackgroundClose();
};
watch(showCart, (value) => {
  if (value) {
    showDialog();
    return;
  }
  closeDialog();
});
</script>
<template>
  <main
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
        <div
          class="flex flex-row justify-between items-center min-h-[75px] p-3 px-4"
        >
          <p class="font-bold">Resumen de Cotización</p>
          <button class="p-4" @click="handleBackgroundClose">
            <svg
              width="25"
              height="25"
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
        </div>
        <div
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

          <p><strong>¡Tu cotización está vacía!</strong></p>
          <p class="text-center">
            Explora todos los productos disponibles <br />
            y agrega algunos a tu cotización en la tienda.
          </p>
          <button @click="handleSearchProducts" class="btn btn-primary">
            Buscar productos
          </button>
        </div>
        <ul class="flex flex-col overflow-y-scroll h-full gap-4 p-4">
          <li v-for="p in productCart">
            <CardCartModal
              :key="p?.id"
              :product="p?.product"
              :quantity="p?.quantity"
              :selection="p?.selection"
              @decrease="() => store.decreaseProduct(p?.id)"
              @increment="() => store.incrementProduct(p?.id)"
              @delete="(e) => store.deleteProduct(p?.id)"
            />
          </li>
        </ul>
        <section
          v-if="productCart?.length > 0"
          class="flex flex-row gap-4 px-3"
        >
          <NuxtLink
            @click="handleBackgroundClose"
            to="/cotizar"
            class="btn btn-primary w-full"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 151 151"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M99.0937 81.7917C99.0937 80.5402 98.5966 79.3399 97.7117 78.455C96.8267 77.5701 95.6265 77.0729 94.375 77.0729H56.625C55.3735 77.0729 54.1733 77.5701 53.2883 78.455C52.4034 79.3399 51.9062 80.5402 51.9062 81.7917C51.9062 83.0431 52.4034 84.2434 53.2883 85.1283C54.1733 86.0133 55.3735 86.5104 56.625 86.5104H94.375C95.6265 86.5104 96.8267 86.0133 97.7117 85.1283C98.5966 84.2434 99.0937 83.0431 99.0937 81.7917ZM99.0937 106.958C99.0937 105.707 98.5966 104.507 97.7117 103.622C96.8267 102.737 95.6265 102.24 94.375 102.24H56.625C55.3735 102.24 54.1733 102.737 53.2883 103.622C52.4034 104.507 51.9062 105.707 51.9062 106.958C51.9062 108.21 52.4034 109.41 53.2883 110.295C54.1733 111.18 55.3735 111.677 56.625 111.677H94.375C95.6265 111.677 96.8267 111.18 97.7117 110.295C98.5966 109.41 99.0937 108.21 99.0937 106.958Z"
                fill="white"
                class="fill-white dark:fill-white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M44.0418 14.1562C39.453 14.1563 35.0522 15.9791 31.8074 19.2239C28.5626 22.4687 26.7397 26.8695 26.7397 31.4583V119.542C26.7397 124.13 28.5626 128.531 31.8074 131.776C35.0522 135.021 39.453 136.844 44.0418 136.844H106.959C111.547 136.844 115.948 135.021 119.193 131.776C122.438 128.531 124.261 124.13 124.261 119.542V50.132C124.261 47.7349 123.48 45.407 122.033 43.4943L103.171 18.529C102.145 17.1707 100.817 16.0689 99.2933 15.3102C97.7693 14.5515 96.0902 14.1565 94.3877 14.1562H44.0418ZM36.1772 31.4583C36.1772 27.1171 39.7006 23.5937 44.0418 23.5937H89.6564V51.2582C89.6564 53.863 91.7704 55.977 94.3752 55.977H114.823V119.542C114.823 123.883 111.3 127.406 106.959 127.406H44.0418C39.7006 127.406 36.1772 123.883 36.1772 119.542V31.4583Z"
                fill="white"
                class="fill-white dark:fill-white"
              />
            </svg>
            Ver mi Cotizacion
          </NuxtLink>
        </section>
      </section>
    </aside>
  </main>
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
