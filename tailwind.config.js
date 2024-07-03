/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width : {
        "450" : "450px",
      },
      height :{
        "100vh" : "100vh"
      }
    },
  },
  plugins: [],
}