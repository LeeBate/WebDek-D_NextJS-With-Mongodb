/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
darkMode: 'class',
  theme: {
    extend: {
     colors: {
        brand: {
          bar: "#465A93",
        },
        lineClamp: {
          10: "10",
          12: "12",
        },
     },
    },
    
  },
  variants:{
    extend: {
      backgroundColor: ["active"],
      lineClamp: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
