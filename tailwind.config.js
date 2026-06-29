/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Tajawal', 'sans-serif'],
      },
      colors: {
        'brand-blue': {
          DEFAULT: '#3E66AD',
          50: '#EEF3FA',
          100: '#D6E2F3',
          200: '#ADC5E7',
          300: '#84A8DB',
          400: '#5B8BCF',
          500: '#3E66AD',
          600: '#325289',
          700: '#263D65',
          800: '#1A3D6E',
          900: '#122A4D',
          950: '#0A1829',
        },
        'brand-green': {
          DEFAULT: '#58B381',
          50: '#EDF8F2',
          100: '#D4F0E0',
          200: '#A9E1C1',
          300: '#7ED2A2',
          400: '#58B381',
          500: '#46996A',
          600: '#3A7D57',
          700: '#2E6144',
        },
        'brand-orange': {
          DEFAULT: '#F2A93B',
          50: '#FEF6E8',
          100: '#FCEACC',
          200: '#F9D599',
          300: '#F5BF66',
          400: '#F2A93B',
          500: '#D9922A',
          600: '#B87A22',
        },
      },
    },
  },
  plugins: [],
}
