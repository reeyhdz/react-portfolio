/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      mob: "375px",
      laptop: "1024px",
      laptopl: "1440px",
      desktop: "1280px",
    },
    extend: {},
  },
  plugins: [],
};
