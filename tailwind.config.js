/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'true-black': '#000000',
        black: '#121212',
        gray: '#282828',
        'light-gray': '#3E3E3E',
        white: '#FFFFFF',
        green: '#1DB954',
        purple: '#400073',
        subdued: '#AFAFAF',
        'dark-subdued': '#636363',
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        body: 'Montserrat',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
    },
  },
  plugins: [],
};
