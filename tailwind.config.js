/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customGreen: '#EEF6EF', // Add a custom name for your color
        customDark: '#2C2C2C',
        aadDark: '#2F3630',
        bulkDark:'#242424',
        bulkLight:'#FBFDFC'
       },  backgroundImage: {
        customGradient: 'linear-gradient(358.24deg, rgba(53, 121, 55, 0.1) 1.27%, rgba(208, 255, 210, 0.1) 98.29%)',
      }
    },
  },
  plugins: [],
};