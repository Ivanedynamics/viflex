<script setup lang="ts">
import type { IImage } from "~/server/api/models";

const { data, status } = useFetch<{ image: IImage }>("/api/images/byOne", {
  params: {
    display: "FONDO_INICIO",
  },
});
</script>

<template>
  <section class="relative h-[70dvh]">
    <div
      class="w-full h-full flex items-center justify-center"
      :style="{
        backgroundImage: `url(${data?.image?.image_url})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div
        class="bg-black bg-opacity-60 flex items-center justify-center w-full h-full px-4"
      >
        <div class="w-full max-w-[1240px]">
          <article
            class="h-full flex flex-col items-center gap-8 justify-center"
          >
            <div class="flex flex-col mobile_s:gap-0 laptop:gap-4">
              <h1
                class="text-white font-extrabold text-4xl text-center mobile_s:text-[1.2rem] mobile_m:text-[1.5rem] mobile_l:text-[1.7rem] tablet:text-[2.3rem] laptop:text-[2.5rem]"
              >
                Fabricamos los mejores vinilos <br />
                de gran
                <span class="bg-primary text-white px-2">
                  calidad y durabilidad.
                </span>
              </h1>
              <p
                class="text-xl text-white text-center mobile_s:text-[14px] tablet:text-lg laptop:text-xl"
              >
                Descubre nuestra amplia gama de productos de alta calidad<br />
                y genera una cotización personalizada a tu medida.
              </p>
            </div>

            <div class="flex flex-row gap-4">
              <NuxtLink to="/cotizar" class="btn btn-primary">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 7H9M15 11H9M15 15H11M5 3H19V21L17.968 20.116C17.6055 19.8053 17.1439 19.6346 16.6665 19.6346C16.1891 19.6346 15.7275 19.8053 15.365 20.116L14.333 21L13.302 20.116C12.9395 19.8051 12.4776 19.6342 12 19.6342C11.5224 19.6342 11.0605 19.8051 10.698 20.116L9.667 21L8.635 20.116C8.27253 19.8053 7.81088 19.6346 7.3335 19.6346C6.85611 19.6346 6.39447 19.8053 6.032 20.116L5 21V3Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p class="text-white">Cotizar ahora</p>
              </NuxtLink>
              <NuxtLink to="/productos" class="btn btn-neutral">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 3H2V9H3V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9H22V3ZM4 5H20V7H4V5ZM19 20H5V9H19V20ZM9 11H15C15 11.5304 14.7893 12.0391 14.4142 12.4142C14.0391 12.7893 13.5304 13 13 13H11C10.4696 13 9.96086 12.7893 9.58579 12.4142C9.21071 12.0391 9 11.5304 9 11Z"
                    fill="white"
                  />
                </svg>

                <p class="text-white">Ver Productos</p>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
