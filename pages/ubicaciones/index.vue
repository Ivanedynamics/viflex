<script setup>
import Contact from "~/components/Contact.vue";
import { useFetch, useHead } from "#imports";

const { data: seoData } = await useFetch("/api/seo/page", {
  params: { slug: "LOCATION" },
});

// Configura los metadatos SEO utilizando useHead
useHead(CreateSEOMetaPage(seoData?.value?.seo?.page));
</script>

<template>
  <Contact />
  <main
    class="flex-col pt-5 flex items-center justify-center px-3 mb-20"
  ></main>
</template>
