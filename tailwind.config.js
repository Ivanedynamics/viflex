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
      mobile_s: "320px",
      mobile_m: "375px",
      mobile_l: "425px",
      // => @media (min-width: 640px) { ... }
      tablet: "768px",
      // => @media (min-width: 768px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }

      desktop_l: "1440px",
      // => @media (min-width: 1536px) { ... }
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
            stroke: "#111827",
          },
          ".footer_page": {
            "background-color": "#111827",
            color: "white",
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
            stroke: "white",
          },
          ".footer_page": {
            "background-color": "#1f2937",
            color: "white",
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
