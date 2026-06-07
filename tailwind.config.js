/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    screens: {
      sm: '393px', // mobile
      md: '820px', // tablet
      lg: '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px', // mobile
        mobile: '16px',
        tablet: '56px',
        desktop: '60px',
      },
    },
    extend: {
      colors: {
        main: '#f0ece9',
        'brown-dark': '#1d110a',
        accent: '#a76f53',
        button: '#5b242a',
        grey: '#727272',
      },
      fontFamily: {
        main: ['Manrope', 'sans-serif'],
        second: ['Lato', 'sans-serif'],
        third: ['Merriweather', 'serif'],
      },
      fontSize: {
        heading1: '60px',
        heading2: '54px',
        heading3: '24px',
        base: '16px',
        second: '20px',
        mobile: '12px',
      },
    },
  },
  plugins: [],
};
