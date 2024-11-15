/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}'
  ],
  theme: {
    extend: {
      fontFamily:{
        monosans:[ "Mona Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}

