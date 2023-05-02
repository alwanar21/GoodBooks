/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Roboto', "sans-serif"],
      },
      colors: {
        primary: '#F4F1EA',
        secondary: '#372213'
      },
      backgroundImage: {
        'hero': "url('./src/assets/hero-bg.jpg')",
      }
    },
  },
  plugins: [require("daisyui")],
}


