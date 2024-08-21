/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#34d399',
        'blue': '#0ea5e9',
        'purple': '#d4aafb',
      },
    },
  },
  plugins: [],
}

