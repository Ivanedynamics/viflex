// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/robots",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vee-validate/nuxt",
    // '@nuxt/image',
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
    },
  },
});