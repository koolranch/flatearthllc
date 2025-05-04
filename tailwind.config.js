/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        flat: {
          primary:  "#2563eb",
          secondary:"#059669",
          accent:   "#f97316",
          gray:     "#f5f5f5",
        },
      },
      spacing: { '128': '32rem', '144': '36rem' },
      screens: { '2xl': '1536px' },
    },
  },
  plugins: [],
}; 