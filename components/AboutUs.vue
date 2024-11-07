<script setup lang="ts">
const aboutus = [
  {
    id: 1,
    title: "Experiencia",
    description:
      "35 años en la fabricacion de productos de vinilo para los sectores industriales y domésticos.",
    image: "/extra/product/guardapolvo.png",
  },

  {
    id: 2,
    title: "Proceso",
    description:
      "Utilizamos materiales 100% reciclabes con bajo impacto ambiental como: PVC, Fibras Textiles Naturales, Bioplásticos.",
    image: "/extra/product/gaskets.png",
  },
  {
    id: 3,
    title: "Produccion",
    description:
      "Nuestros principales productos son: Empaques de PVC, Tela mosquitera, Guardapolvo, Cintas Adhesivas, Protectores de Pantalla, Tapetes para el Piso, Entre otros.",
    image: "/extra/product/tela_mosquitera_producto.png",
  },
  {
    id: 4,
    title: "Exportacion",
    description:
      "Durante el 2024 hemos exportado mas de 5,000,000 millones de productos a sectores industriales y domesticos. Y en el extranjero hemos exportado 500,000 materias primas.",
    image: `/extra/1-empty-loft-with-steps.jpg`,
  },
];
</script>

<template>
  <section
    class="min-h-[320px] flex-col pt-10 flex items-center justify-center px-3 mt-20"
  >
    <div class="w-full max-w-[1240px] flex flex-col gap-4 items-center">
      <p class="font-bold text-2xl mobile_s:text-lg mobile_l:text-2xl">
        Nuestro Compromiso con la Calidad y la Sostenibilidad
      </p>
      <div
        class="w-full grid grid-cols-4 tablet:grid-cols-2 laptop:grid-cols-4 gap-x-4 gap-y-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-[700px]:grid-cols-1"
      >
        <article
          v-for="about in aboutus"
          class="p-4 rounded-lg gap-4 flex flex-col dark:bg-slate-800 bg-[#fff] shadow-xl"
        >
          <img
            :src="about.image"
            :alt="`sobre_nosotros_${about?.title}_${about?.id}`"
            class="w-full h-40 object-cover rounded-lg"
          />
          <div class="flex flex-col items-start justify-end">
            <p class="text-lg font-bold">{{ about.title }}</p>
            <p class="text-sm">{{ about.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
