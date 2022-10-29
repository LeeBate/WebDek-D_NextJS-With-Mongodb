/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
darkMode: 'class',
  theme: {
    aspectRatio: {
      none: 0,
      square: [1, 1],
      "16/9": [16, 9],
      "4/3": [4, 3],
      "21/9": [21, 9]
  },
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
      aspectRatio: ["responsive", "hover"],
      display: ['responsive', 'group-hover', 'group-focus'],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
