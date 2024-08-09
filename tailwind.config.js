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
        'dark-subdued': '#636363',
      },
      dropShadow: {
        above: 'filter: drop-shadow(0 -1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 -1px 1px rgb(0 0 0 / 0.06))',
      },
    },
  },
  plugins: [],
};
