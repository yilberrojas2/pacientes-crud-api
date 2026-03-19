/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E5DA8",
        secondary: "#1B82D1",
        accent: "#3FA9F5",
      },
    },
  },
  plugins: [],
};
