/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      colors: {
        text: '#080303',
        background: '#fdf8f8',
        primary: '#ca504b',
        secondary: '#e49794',
        accent: '#dc5e59',
      },
    },
  },
  plugins: [],
};
