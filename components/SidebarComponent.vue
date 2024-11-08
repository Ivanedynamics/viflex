<script setup lang="ts">
import { headerOptions } from "~/assets/mocks/headeroptions";
import { sidebarId, handleCloseSidebar } from "~/composables/sidebar";
</script>

<template>
  <div class="drawer">
    <input :id="sidebarId" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side" style="z-index: 400">
      <label
        :for="sidebarId"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div
        class="menu pb-5 bg-white dark:bg-slate-900 z-50 text-base-content min-h-full w-80 p-0 gap-4 flex flex-col"
      >
        <section
          class="flex flex-row justify-start items-center min-h-[75px] px-3 sticky top-0 dark:bg-slate-800 bg-white z-50"
        >
          <button class="btn btn-ghost" @click="handleCloseSidebar">
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
          <p class="font-bold text-lg">Menu</p>
        </section>
        <!-- Sidebar content here -->
        <ul class="px-2">
          <li v-for="item in headerOptions" :key="item?.id">
            <NuxtLink :to="item?.link" @click="handleCloseSidebar">
              <div v-html="item.icon" class="icono"></div>
              <p class="text-lg">{{ item?.label }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icono {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
}
</style>
