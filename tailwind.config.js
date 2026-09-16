/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B2A4A',
          50: '#EEF1F6',
          100: '#D6DCE8',
          200: '#AEB9D1',
          300: '#8695B7',
          400: '#5E729D',
          500: '#3D4F76',
          600: '#1B2A4A',
          700: '#16223C',
          800: '#111A2E',
          900: '#0B1220',
        },
        gold: {
          DEFAULT: '#B8863B',
          50: '#FBF4E7',
          100: '#F3E0BB',
          200: '#E6C489',
          300: '#D9A857',
          400: '#C79641',
          500: '#B8863B',
          600: '#946A2E',
          700: '#6F5023',
        },
        paper: '#F7F6F2',
        line: '#E4E1D8',
        ink900: '#14181F',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
