/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#65a30d',
        secondary: '#f97316',
        accent: '#fce5cd',
        text: '#555555',
        text2: '#064e3b',
        background: '#fffff'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

