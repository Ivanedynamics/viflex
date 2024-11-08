<script setup lang="ts">
import { useFetch, useHead } from "#imports";
import ContactSection from "~/components/ContactSection.vue";

const { data: seoData } = await useFetch("/api/seo/page", {
  params: { slug: "LOCATION" },
});

// Configura los metadatos SEO utilizando useHead
useHead(CreateSEOMetaPage(seoData?.value?.seo?.page));
</script>

<template>
  <ContactSection />
</template>
