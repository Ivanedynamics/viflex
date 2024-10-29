<script setup>
const sections = [
  {
    id: 1,
    label: "Horario",
    description: "Abierto las 24 horas",
  },
  {
    id: 2,
    label: "Oficina Central",
    description: `Soldadores 1703 INT #24 y #25, La Alianza, 64103 Monterrey, N.L., México`,
  },
];
</script>

<template>
  <section
    class="min-h-[320px] flex-col pt-10 pb-10 flex items-center justify-center px-3"
  >
    <div class="w-full max-w-[1240px] gap-4 flex flex-col">
      <p class="font-bold text-2xl">Ubicacion de Oficinas y Horarios</p>
      <div class="grid grid-cols-4 gap-4">
        <div class="h-full w-full pb-2 col-span-3 gap-2 flex flex-col">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7185.34133762813!2d-100.4160843922323!3d25.78143929282685!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662c26922f23435%3A0x2e48efa988a86464!2sViflex%20%7C%20Vinilos%20Flexibles!5e0!3m2!1ses-419!2sgt!4v1719178045252!5m2!1ses-419!2sgt"
            width="600"
            height="850"
            style="border: 0"
            loading="lazy"
            class="w-full h-[620px]"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <ul class="flex flex-col gap-4">
          <li v-for="item in sections">
            <article
              class="border w-full bg-white rounded-md overflow-hidden p-2"
            >
              <p class="font-bold text-base">
                {{ item.label }}
              </p>
              <p class="text-sm">
                {{ item?.description }}
              </p>
            </article>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
