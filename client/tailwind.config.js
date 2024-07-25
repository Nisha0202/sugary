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
        secondary: '#ff895b',
        accent: '#fce5cd',
        text: '#555555',
        background: '#fffff'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

