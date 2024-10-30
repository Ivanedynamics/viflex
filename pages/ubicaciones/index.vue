<script setup>
import Contact from "~/components/Contact.vue";

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
  <Contact />
  <main
    class="flex-col pt-5 flex items-center justify-center px-3 mb-20"
  ></main>
</template>
