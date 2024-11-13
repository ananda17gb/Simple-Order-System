/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ["Oxygen", "sans-serif"],
      },
    },
  },
  plugins: [],
};
