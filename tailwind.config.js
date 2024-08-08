/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        black: '#121212',
        white: '#FFFFFF',
        green: '#1DB954',
        purple: '#400073',
        subdued: '#AFAFAF',
        'dark-subdued': '#636363'
      }
    },
  },
  plugins: [],
};
