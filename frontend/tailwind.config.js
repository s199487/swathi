/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0B0B0D",
        surface: "#17171A",
        offwhite: "#F5F4F0",
        franchise: "#FF4FA3",
        dealer: "#3ECF8E",
        associate: "#FFC53D",
        job: "#4CC2FF",
        rule: "#2A2A2E",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
