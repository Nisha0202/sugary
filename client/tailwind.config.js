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
        text: '#1f2937',
        text2: '#1f2937',
        background: '#fffff'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

