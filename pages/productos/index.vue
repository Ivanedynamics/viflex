<script setup>
import { useFetch, useHead } from "#imports";

const { data: seoData } = await useFetch("/api/seo/page", {
  params: { slug: "PRODUCTS" },
});

// Configura los metadatos SEO utilizando useHead
useHead(CreateSEOMetaPage(seoData?.value?.seo?.page));
</script>

<template>
  <Products />
  <AboutUs />
  <!-- <Contact /> -->
</template>
