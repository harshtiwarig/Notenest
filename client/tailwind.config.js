/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        oat: {
          50: "#fffaf2",
          100: "#f7ecdd",
          200: "#eed7bc",
          300: "#e2bb8f",
          400: "#d59d66",
          500: "#c47f49",
          600: "#a96539",
          700: "#874f31",
          800: "#6f422d",
          900: "#5e392a"
        },
        ink: "#1f2520",
        pine: "#20423d",
        cloud: "#f6f1e8",
        clay: "#b7673c",
        blush: "#f1ddd2"
      },
      fontFamily: {
        sans: ['"Manrope"', "sans-serif"],
        serif: ['"Newsreader"', "serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(31, 37, 32, 0.12)",
        glow: "0 0 0 1px rgba(255,255,255,0.4), 0 24px 60px rgba(32, 66, 61, 0.18)"
      }
    }
  },
  plugins: []
};
