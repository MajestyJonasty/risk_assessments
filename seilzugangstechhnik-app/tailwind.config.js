/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4e4e4e",
        secondary: "#7c7c7c",
      },
    },
  },
  plugins: [],
};
