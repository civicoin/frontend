/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background": "#FFEFE3",
        "panel": "#F4E6DB",
        "focus": "#FFA666",
        "light": "#FFF9F4",
        "dark": "#E1D6CE"
      },
      fontFamily: {
        'sans': ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

