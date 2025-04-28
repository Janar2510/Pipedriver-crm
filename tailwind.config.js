/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#800020',
          50: '#FFF0F3',
          100: '#FFD6DE',
          200: '#FFB3C1',
          300: '#FF8FA3',
          400: '#FF6B85',
          500: '#FF4767',
          600: '#CC384F',
          700: '#992A3B',
          800: '#661C27',
          900: '#330E13',
          950: '#1A0709',
        },
        dark: {
          DEFAULT: '#1A0709',
          50: '#FFF0F3',
          100: '#FFD6DE',
          200: '#4A2D33',
          300: '#3D2429',
          400: '#2D1B1E',
          500: '#241517',
          600: '#1A0F10',
          700: '#110A0B',
          800: '#0D0808',
          900: '#080505',
          950: '#030202',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'inner-md': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};