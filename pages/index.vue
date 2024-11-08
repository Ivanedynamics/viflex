<script setup lang="ts">
import CategoriesSection from "~/components/CategoriesSection.vue";

import { useFetch, useHead } from "#imports";

// Llama a la API en el mismo servidor para obtener los datos SEO
const { data: seoData } = await useFetch("/api/seo/page", {
  params: { slug: "HOME" },
});

// Configura los metadatos SEO utilizando useHead
useHead(CreateSEOMetaPage(seoData?.value?.seo?.page));
</script>

<template>
  <Presentation />
  <CategoriesSection />
  <MostRecentProducts />
  <AboutUs />
  <ContactSection />
</template>
