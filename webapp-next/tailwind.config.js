/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.indigo,
      gray: colors.coolGray,
      red: colors.red,
      green: colors.green,
      white: colors.white,
    },
  },
  plugins: [forms],
}
