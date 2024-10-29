/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#204888",
        secondary: "#00aaff",
        danger: "	#bb2124",
        dark: "#191919",
      },
      backgroundColor: {
        primary: "#204888",
        secondary: "#00aaff",
        danger: "	#bb2124",
        dark: "#191919",
      },
      borderColor: {
        primary: "#204888",
        secondary: "#00aaff",
        danger: "	#bb2124",
        dark: "#191919",
      },
    },
    screens: {
      mobile: "480px", // Para móviles en general
      tablet: "768px", // Para tablets en posición vertical
      laptop: "1024px", // Para pantallas de laptop y tablets en horizontal
      desktop: "1280px", // Para monitores de escritorio estándar
      wide: "1536px", // Para pantallas anchas y ultra-widescreen
    },
  },
  plugins: [],
  nitro: {
    storage: {
      data: { driver: "vercelKV" },
    },
  },
};
