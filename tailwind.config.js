/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#3B82F6", // muted electric blue
          soft: "#93C5FD",
          dark: "#2563EB",
        },
      },
    },
  },
  plugins: [],
};
