<script setup lang="ts"></script>

<template>
  <section
    class="h-full flex items-center justify-center flex-col relative mt-32 px-4 mobile_s:mt-20 laptop:mt-32"
  >
    <div class="w-full h-full flex items-center justify-center">
      <div class="w-full max-w-[1240px]">
        <article class="h-full flex flex-col items-center gap-8 justify-center">
          <div class="flex flex-col gap-6 mobile_s:gap-2 laptop:gap-6">
            <h1
              class="font-extrabold text-4xl text-center mobile_s:text-[1.2rem] mobile_m:text-[1.5rem] mobile_l:text-[1.7rem] tablet:text-[2.3rem] laptop:text-[2.5rem]"
            >
              Fabricamos los mejores vinilos <br />
              de gran
              <span class="bg-primary text-white px-2"
                >calidad y durabilidad</span
              >.
            </h1>
            <p
              class="text-xl text-center mobile_s:text-[14px] tablet:text-lg laptop:text-xl"
            >
              Descubre nuestra amplia gama de productos de alta calidad<br />
              y genera una cotización personalizada a tu medida.
            </p>
          </div>
          <div
            class="stats shadow flex mobile_s:w-full mobile_s:flex-col tablet:flex-row tablet:w-fit"
          >
            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Productos</div>
              <div class="stat-value mobile_s:text-lg laptop:text-2xl">216</div>
              <div class="stat-desc">Desde enero hasta octubre</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Clientes</div>
              <div class="stat-value mobile_s:text-lg laptop:text-2xl">2K</div>
              <div class="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Cotizaciones</div>
              <div class="stat-value mobile_s:text-lg laptop:text-2xl">
                12,500
              </div>
              <div class="stat-desc">↗︎ 50 (14%)</div>
            </div>
          </div>
          <NuxtLink to="/productos" class="btn btn-neutral">
            <p class="">Ver Productos</p>
          </NuxtLink>
        </article>
      </div>
    </div>
    <div
      class="w-full max-w-[1240px] grid grid-cols-4 mobile_s:gap-4 mobile_s:grid-cols-1 mobile_l:grid-cols-1 tablet:grid-cols-4 gap-8 mt-8"
    >
      <img
        src="public/bg2.jpg"
        class="h-[250px] w-full object-cover rounded-lg"
      />
      <img
        src="public/bg.jpg"
        class="h-[250px] w-full object-cover rounded-lg"
      />
      <img
        src="public/extra/1-empty-loft-with-steps.jpg"
        class="h-[250px] w-full object-cover rounded-lg mobile_s:hidden tablet:flex"
      />
      <img
        src="public/extra/product/empaque_de_vinil.png"
        class="h-[250px] w-full object-cover rounded-lg mobile_s:hidden tablet:flex"
      />
    </div>
  </section>
</template>
