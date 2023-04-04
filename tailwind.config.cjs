/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        blue: '#1B74E4',
        fondo: '#fafafa',
        blanco: '#FFFFFF',
        gris: '#8492a6',
        'gris-oscuro': '#273444',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      screens: {
        '2xs': '500px',
        '2md': '950px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}
