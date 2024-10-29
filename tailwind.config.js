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
  plugins: [require("daisyui")],
  daisyui: {
    // themes: ["light", "dark"],
    themes: [
      {
        light: {
          primary: "#2563eb",

          secondary: "#9ca3af",
          ".container-box": {
            "background-color": "white",
          },
          ".icon-fill": {
            fill: "#111827",
          },
          accent: "#22d3ee",

          neutral: "#111827",

          "base-100": "#f3f4f6",

          info: "#0ea5e9",

          success: "#22c55e",

          warning: "#fde047",

          error: "#ef4444",
        },
      },
      {
        dark: {
          primary: "#2563eb",

          secondary: "#9ca3af",
          ".container-box": {
            "background-color": "#1A222E",
          },
          ".icon-fill": {
            fill: "white",
          },

          accent: "#22d3ee",

          neutral: "#374151",

          "base-100": "#111827",

          info: "#0ea5e9",

          success: "#22c55e",

          warning: "#fde047",

          error: "#ef4444",
        },
      },
    ],
    darkTheme: "light",
  },
  nitro: {
    storage: {
      data: { driver: "vercelKV" },
    },
  },
};
